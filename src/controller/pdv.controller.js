const PDVSchema = require("../models/pdvSchema");
const productsSchema = require("../models/productsSchema");
const clientsSchema = require("../models/clientsSchema");
const jwt = require("jsonwebtoken");
const addLogs = require("../utils/addLogs");
const cashiersSchema = require("../models/cashiersSchema");
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
    const { products, totalSell, cpfClient } = req.body;
    const bearer = req.headers["authorization"].split(" ")[1];

    const userID = jwt.verify(bearer, process.env.SECRET);
    const user = await usersSchema.findById(userID);

    if (!userID || !products || !totalSell) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    const isClient = clientsSchema.findOne({ cpf: cpfClient });

    if (!isClient) {
      const newClient = new clientsSchema({
        name: "",
        cpf: cpfClient,
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
      cpfClient,
      products,
      totalSell,
      state: "Aberto",
      createdAt: Date.now(),
    });

    try {
      await newPDV.save();
      return res.status(201).json({ message: "PDV criado com sucesso" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao criar PDV", err });
    }
  }

  static async recivePDV(req, res) {
    const { id } = req.params;
    const { paymentMethods, cashierID } = req.body;
    const user = await usersSchema.findById(jwt.verify(req.headers["authorization"].split(" ")[1], process.env.SECRET));
    const pdv = await PDVSchema.findById(id);
    const client = await clientsSchema.findOne({ cpf: pdv.cpfClient });

    if (!user) {
      throw console.error("Usuário não encontrado");
    }

    if (!id || !paymentMethods) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    if (!pdv) {
      return res.status(404).json({ message: "PDV não encontrado" });
    }

    if (!client) {
      throw console.error("Cliente não encontrado");
    }

    pdv.state = "Fechado";
    pdv.paymentMethods = paymentMethods;

    pdv.paymentMethods.forEach((method) => {
      if (method.method === "Dinheiro") {
        const cashier = cashiersSchema.findById(cashierID);
        if (!cashier) {
          throw console.error("Caixa não encontrado");
        }
        cashier.totalCash += method.value;
        cashier.save();
      }
    });

    const newPurchase = {
      productsID: pdv.products,
      paymentMethods: pdv.paymentMethods,
      totalValue: pdv.totalSell,
      date: Date.now(),
    };

    client.purchases.push(newPurchase);

    const newLog = {
      action: "Receber PDV",
      date: Date.now(),
      description: `Recebeu o PDV ${pdv._id} de ${client.name} no valor de R$${pdv.totalSell}`,
    };

    user.logs.push(newLog);

    try {
      await addLogs(user, newLog);
      await client.save();
      await pdv.save();
      updateStock(pdv.products);
      return res.status(200).json({ message: "PDV recebido com sucesso" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao receber PDV", err });
    }
  }

  static async getByDayPDV(req, res) {
    const { day } = req.body;

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
    console.log(productDB);
    if (!productDB) {
      throw console.error("Produto não encontrado");
    }

    productDB.realStock = productDB.realStock - product.quantity;
    productDB.moveStock = product.quantity;
    await productDB.save();
  });
}
