const PDVSchema = require("../models/pdvSchema");
const productsSchema = require("../models/productsSchema");
const clientsSchema = require("../models/clientsSchema");
const jwt = require("jsonwebtoken");
const addLogs = require("../utils/addLogs");
const cashiersSchema = require("../models/cashiersSchema");
const usersSchema = require("../models/userSchema");

require("dotenv").config();

module.exports = class PDVController {
  static async getPDV(req, res) {
    const { id } = req.params;

    PDVSchema.findById(id)
      .then((pdv) => {
        return res.status(200).json(pdv);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Erro ao buscar PDV", err });
      });
  }

  static async createPDV(req, res) {
    try {
      const { products, totalSell, cpfcnpjClient } = req.body;

      const bearer = req.headers["authorization"].split(" ")[1];
      const userID = jwt.verify(bearer, process.env.SECRET);
      const user = await usersSchema.findById(userID.id);

      if (!userID || !products || !totalSell) {
        return res.status(422).json({ message: "Dados não informados" });
      }

      const isClient = clientsSchema.findOne({ cpf: cpfcnpjClient });

      if (!isClient) {
        const newClient = new clientsSchema({
          name: "",
          cpfcnpj: cpfcnpjClient,
          email: "",
          phone: "",
          address: "",
          purchases: [],
          createdAt: Date.now(),
        });
        await newClient.save();
      }

      const newPDV = new PDVSchema({
        user: user.name,
        cpfcnpjClient,
        products,
        totalSell,
        state: "Aberto",
        createdAt: Date.now(),
      });

      await newPDV.save();
      return res.status(201).json({ message: "PDV criado com sucesso" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao criar PDV", err });
    }
  }

  static async recivePDV(req, res) {
    try {
      const { id } = req.params;
      const { paymentMethods, cashierID } = req.body;
      const bearer = jwt.verify(
        req.headers["authorization"].split(" ")[1],
        process.env.SECRET
      );
      const user = await usersSchema.findById(bearer.id);
      const pdv = await PDVSchema.findById(id);

      const client = await clientsSchema.findOne({
        cpfcnpj: pdv.cpfcnpjClient,
      });

      if (pdv.state === "Fechado") {
        return res.status(400).json({ message: "PDV já foi recebido" });
      }

      if (!user) {
        throw console.error("Usuário não encontrado");
      }

      if (!id || !paymentMethods) {
        return res.status(422).json({ message: "Dados não informados" });
      }

      if (!pdv) {
        return res.status(404).json({ message: "PDV não encontrado" });
      }
      const totalSellPayment = pdv.paymentMethods.reduce((acc, method) => {
        return acc + method.value;
      }, 0);

      if (totalSellPayment < pdv.totalSell) {
        return res
          .status(400)
          .json({ message: "Valor recebido menor que o valor da venda" });
      }

      pdv.state = "Fechado";
      pdv.paymentMethods = paymentMethods;

      pdv.paymentMethods.forEach(async (method) => {
        if (method.method === "Dinheiro") {
          const cashier = await cashiersSchema.findById(cashierID);
          if (!cashier) {
            console.error("Caixa não encontrado");
          } else {
            cashier.totalCash += method.value;
            cashier.save();
          }
        }
      });

      const newLog = {
        action: "Receber PDV",
        date: Date.now(),
      };

      if (client) {
        const newPurchase = {
          productsID: pdv.products,
          paymentMethods: pdv.paymentMethods,
          totalValue: pdv.totalSell,
          date: Date.now(),
        };

        client.purchases.push(newPurchase);
        client.save();
        (newLog.description = `Recebeu o PDV ${pdv.id} de ${client.name} no valor de R$${pdv.totalSell}`),
          user.logs.push(newLog);
      } else {
        (newLog.description = `Recebeu o PDV ${pdv.id} no valor de R$${pdv.totalSell}`),
          user.logs.push(newLog);
      }

      await addLogs(user, newLog);
      await pdv.save();
      updateStock(pdv.products);
      return res.status(200).json({ message: "PDV recebido com sucesso" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao receber PDV", err });
    }
  }

  static async getByDayPDV(req, res) {
    const { day } = req.query;

    if (!day) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    const pdvs = await PDVSchema.find({
      createdAt: {
        $gte: new Date(day),
        $lt: new Date(day).setDate(new Date(day).getDate() + 1),
      },
    });

    if (!pdvs) {
      return res.status(404).json({ message: "PDV não encontrado" });
    }

    return res.status(200).json({
      message: "Operação realizada com sucesso",
      data: pdvs,
      totalItens: pdvs.length,
    });
  }
};

async function updateStock(products) {
  products.forEach(async (product) => {
    const productDB = await productsSchema.findById(product.productID);
    if (!productDB) {
      throw console.error("Produto não encontrado");
    }

    productDB.realStock = productDB.realStock - product.quantity;
    productDB.moveStock = product.quantity;
    await productDB.save();
  });
}
