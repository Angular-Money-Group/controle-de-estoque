const cashiersSchema = require("../models/cashiersSchema");
const PDVSchema = require("../models/pdvSchema");
const userSchema = require("../models/userSchema");
const addLogs = require("../utils/addLogs");
const jwt = require("jsonwebtoken");

module.exports = class CashiersController {
  static async getCashiers(req, res) {
    const cashiers = await cashiersSchema.find();
    return res.status(200).json(cashiers);
  }

  static async openCashier(req, res) {
    const { name, totalCash } = req.body;
    const ip = req.connection.remoteAddress;
    const user = await userSchema.findById(
      jwt.verify(req.headers["authorization"].split(" ")[1] , process.env.SECRET).id)
    ;

    if (!name) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    const cashier = await cashiersSchema.findOne({ name });

    if (!cashier) {
      const newCashier = new cashiersSchema({
        name,
        totalCash,
        stateCashier: {state: "Aberto", ip},
        history: [
          {
            user: user.name,
            operation: "Abertura",
            value: totalCash,
            ip,
            date: Date.now(),
          },
        ],
        createdAt: Date.now(),
      });

      try {
        await addLogs(user, {
          action: "Abertura de caixa",
          date: Date.now(),
          description: `O usuário ${user.name} abriu o caixa ${name} com o valor de ${totalCash}`,
        });

        await newCashier.save();
        return res.status(201).json({ message: "Caixa criado com sucesso", data: {cashierId: newCashier.id, totalCash: newCashier.totalCash} });
      } catch (err) {
        return res.status(400).json({ message: "Erro ao criar caixa", err });
      }
    } else {

      if(cashier.stateCashier.state === "Aberto"){
        if(cashier.stateCashier.ip !== ip){
          return res.status(400).json({ message: "Caixa já está aberto em outra maquina!", data: {cashierId: cashier.id} });
        } else {
          return res.status(200).json({ message: "Caixa já está aberto!", data: {cashierId: cashier.id} });
        }
      }

      cashier.stateCashier = {state: "Aberto", ip},
      cashier.totalCash = totalCash;

      cashier.history.push({
        user: user.name,
        operation: "Abertura",
        value: totalCash,
        ip,
        date: Date.now(),
      });

      try {
        await addLogs(user, {
          action: "Abertura de caixa",
          date: Date.now(),
          description: `O usuário ${user.name} abriu o caixa ${name} com o valor de ${totalCash}`,
        });
        await cashier.save();
        return res.status(200).json({ message: "Caixa aberto com sucesso", data: {cashierId: cashier.id, totalCash: cashier.totalCash} });
      } catch (err) {
        return res.status(400).json({ message: "Erro ao abrir caixa", err });
      }
    }
  }

  static async closeCashier(req, res) {
    const { id } = req.params;
    const { totalCash } = req.body;
    const user = await userSchema.findById(
      jwt.verify(req.headers["authorization"].split(" ")[1], process.env.SECRET)
    );
    const cashier = await cashiersSchema.findById(id);

    if (!id || !totalCash) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    cashier.stateCashier = { state: "Fechado", ip: null }
    
    cashier.history.push({
      user: user.name,
      operation: "Fechamento",
      value: totalCash,
      date: Date.now(),
    });

    try {
      await addLogs(user, {
        action: "Abertura de caixa",
        date: Date.now(),
        description: `O usuário ${user.name} fechou o caixa ${cashier.name} com o valor de ${totalCash}`,
      });
      await cashier.save();
      return res.status(201).json({ message: "Caixa fechado com sucesso" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao fechar caixa", err });
    }
  }

  static async addCashier(req, res) {
    const { id } = req.params;
    const { totalCash } = req.body;
    const user = await userSchema.findById(
      jwt.verify(req.headers["authorization"].split(" ")[1], process.env.SECRET)
    );

    if (!user) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    if (!id || !totalCash) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    const cashier = await cashiersSchema.findById(id);

    if (!cashier) {
      return res.status(404).json({ message: "Caixa não encontrado" });
    }

    cashier.totalCash += totalCash;

    cashier.history.push({
      user: user.name,
      operation: "Reforço",
      value: totalCash,
      date: Date.now(),
    });

    try {
      await cashier.save();
      await addLogs(user, {
        action: "Reforço de caixa",
        date: Date.now(),
        description: `O usuário ${user.name} reforçou o caixa ${cashier.name} com o valor de ${value}`,
      });
      return res.status(201).json({ message: "Caixa reforçado com sucesso" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao reforçar caixa", err });
    }
  }

  static async removeCashier(req, res) {
    const { id } = req.params;
    const { totalCash } = req.body;
    const user = await userSchema.findById(
      jwt.verify(req.headers["authorization"].split(" ")[1], process.env.SECRET)
    );

    if (!user) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    if (!id || !totalCash) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    const cashier = await cashiersSchema.findById(id);

    if (!cashier) {
      return res.status(404).json({ message: "Caixa não encontrado" });
    }

    cashier.totalCash -= totalCash;

    cashier.history.push({
      user: user.name,
      operation: "Sangria",
      value: totalCash,
      date: Date.now(),
    });

    try {
      await cashier.save();
      await addLogs(user, {
        action: "Sangria de caixa",
        date: Date.now(),
        description: `O usuário ${user.name} sangrou o caixa ${cashier.name} com o valor de ${value}`,
      });
      return res.status(201).json({ message: "Caixa sangrado com sucesso" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao sangrar caixa", err });
    }
  }

  static async getCashiersData(req, res) {
    const { id } = req.params;

    const cashiers = await cashiersSchema.findById(id);

    if (!cashiers) {
      return res.status(404).json({ message: "Caixa não encontrado" });
    }

    let totalPayments = [];

    try {
      cashiers.sales.forEach(async (sales) => {
        const pdv = await PDVSchema.findById(sales);

        pdv.sale.paymentMethods.reduce((acc, payment) => {
          totalPayments.push(payment);
        }, 0);
      });

      return res
        .status(200)
        .json({
          message: "Operação realizada com sucesso",
          data: totalPayments,
        });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao buscar caixa", err });
    }
  }
};
