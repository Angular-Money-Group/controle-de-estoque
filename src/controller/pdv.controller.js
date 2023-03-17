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
        return res
          .status(200)
          .json({ message: "Operação realizada com sucesso", data: pdv });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Erro ao buscar PDV", err });
      });
  }

  static async createPDV(req, res) {
    try {
      const { products, totalSell, cpfcnpjClient, paymentMethods, cashierID } =
        req.body;

      const bearer = req.headers["authorization"].split(" ")[1];
      const userID = jwt.verify(bearer, process.env.SECRET);
      const user = await usersSchema.findById(userID.id);
      const cashier = await cashiersSchema.findById(cashierID);

      if (!userID || !products || !totalSell) {
        return res.status(422).json({ message: "Dados não informados" });
      }

      const newLog = {
        action: "Receber PDV",
        date: Date.now(),
      };

      paymentMethods.forEach(async (method) => {
        if (method.method === "Dinheiro") {
          cashier.totalCash += method.value;
          cashier.save();
        }
      });

      const newPDV = new PDVSchema({
        user: user.name,
        cpfcnpjClient,
        products,
        totalSell,
        paymentMethods,
        state: "Fechado",
        createdAt: Date.now(),
      });

      if (cashier) {
        cashier.sales.push({
          user: user.name,
          sellID: newPDV.id,
          date: Date.now(),
        });
      }

      if (cpfcnpjClient) {
        const isClient = clientsSchema.findOne({ cpf: cpfcnpjClient });
        if (!isClient || isClient === null) {
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

          newLog.description = `Recebeu o PDV ${newPDV.id} no valor de R$${newPDV.totalSell}`;

          user.logs.push(newLog);
        } else {
          const newPurchase = {
            productsID: newPDV.products,
            paymentMethods: newPDV.paymentMethods,
            totalValue: newPDV.totalSell,
            date: Date.now(),
          };

          isClient.purchases.push(newPurchase);
          isClient.save();

          newLog.description = `Recebeu o PDV ${newPDV.id} de ${isClient.name} no valor de R$${newPDV.totalSell}`;

          user.logs.push(newLog);
        }
      }

      await newPDV.save();
      await addLogs(user, newLog);
      await cashier.save();
      updateStock(products);
      return res
        .status(200)
        .json({ message: "PDV recebido com sucesso", data: newPDV.id });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao receber PDV", err });
    }
  }

  static async updatePDV(req, res) {
    try {
      const { id } = req.params;
      const { products, totalSell, cpfcnpjClient, paymentMethods } = req.body;

      const bearer = req.headers["authorization"].split(" ")[1];

      const userID = jwt.verify(bearer, process.env.SECRET);
      const user = await usersSchema.findById(userID.id);

      if (!userID || !products || !totalSell) {
        return res.status(422).json({ message: "Dados não informados" });
      }

      const pdv = await PDVSchema.findById(id);

      if (!pdv) {
        return res.status(404).json({ message: "PDV não encontrado" });
      }

      if (pdv.paymentMethods.find((method) => method.method === "Dinheiro")) {
        const cashier = await cashiersSchema.findById(pdv.cashierID);
        const method = pdv.paymentMethods.find(
          (method) => method.method === "Dinheiro"
        );
        const value = method.value;

        cashier.totalCash -= value;
        cashier.save();
      }

      await returnProducts(products);

      pdv.products = products;
      pdv.totalSell = totalSell;
      pdv.cpfcnpjClient = cpfcnpjClient;
      pdv.paymentMethods = paymentMethods;

      const newLog = {
        action: "Atualizar PDV",
        date: Date.now(),
        description: `Atualizou o PDV ${pdv.id} no valor de R$${pdv.totalSell}`,
      };

      paymentMethods.forEach(async (method) => {
        if (method.method === "Dinheiro") {
          const cashier = await cashiersSchema.findById(pdv.cashierID);
          cashier.totalCash += method.value;
          cashier.save();
        }
      });

      if (cpfcnpjClient) {
        const isClient = await clientsSchema.findOne({ cpf: cpfcnpjClient });

        const newPurchase = {
          productsID: pdv.products,
          paymentMethods: pdv.paymentMethods,
          totalValue: pdv.totalSell,
          date: Date.now(),
        };

        if (!isClient || isClient === null) {
          const newClient = new clientsSchema({
            name: "",
            cpfcnpj: cpfcnpjClient,
            email: "",
            phone: "",
            address: "",
            purchases: [...newPurchase],
            createdAt: Date.now(),
          });
          await newClient.save();

          newLog.description = `Atualizou o PDV ${pdv.id} no valor de R$${pdv.totalSell}`;

          user.logs.push(newLog);
        } else {
          isClient.purchases.push(newPurchase);
          isClient.save();

          newLog.description = `Atualizou o PDV ${pdv.id} de ${isClient.name} no valor de R$${pdv.totalSell}`;

          user.logs.push(newLog);
        }
      }

      await addLogs(user, newLog);
      await pdv.save();
      updateStock(products);

      return res.status(200).json({ message: "PDV atualizado com sucesso", data: pdv.id });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao atualizar PDV", err: err.message });
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
  try{
    products.forEach(async (product) => {
      const productDB = await productsSchema.findById(product.product);
      if (!productDB) {
        console.error("Produto não encontrado");
      }
      
      productDB.realStock = productDB.realStock - product.quantity;
      productDB.moveStock = product.quantity;
      await productDB.save();
    });
  } catch (err) {
    console.log(err);
  }
}

async function returnProducts(products) {
  try{
    products.forEach(async (product) => {
      const productDB = await productsSchema.findById(product.product);
      if (!productDB) {
        console.error("Produto não encontrado");
      } else { 
        productDB.realStock = productDB.realStock + product.quantity;
        productDB.moveStock = product.quantity;
        await productDB.save();
      }
    });
  } catch (err) {
    console.log(err);
  }
}
