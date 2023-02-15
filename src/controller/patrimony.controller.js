const patrimonySchema = require("../models/patrimonySchema");

module.exports = class PatrimonyController {
  static async getPatrimony(req, res) {
    if (req.query.filter) {
      let filter = req.query.filter;
      let allpatrimony = [];
      try {
        if (isNaN(filter)) {
          let patrimonyByName = await patrimonySchema.find({
            name: { $regex: filter, $options: "i" },
          });
          allpatrimony = [...patrimonyByName];
        } else {
          const productByPatrimonyNumber = await patrimonySchema.find();

          allpatrimony = productByPatrimonyNumber.filter((patrimony) => {
            return String(patrimony.patrimonyNumber).indexOf(filter) > -1;
          });
        }

        return res.status(200).json({
          message: "Operação realizada com sucesso",
          data: allpatrimony,
          totalItens: allpatrimony.length,
        });
      } catch (err) {
        return res.status(400).json({ message: "Erro ao consultar", err });
      }
    } else {
      let patrimony = await patrimonySchema.find();
      return res.status(200).json({
        message: "Operação realizada com sucesso",
        data: patrimony,
        totalItens: patrimony.length,
      });
    }
  }

  static async createPatrimony(req, res) {
    try {
      let {
        name,
        priceCost,
        description,
        category,
        patrimonyNumber,
        initialStock,
      } = req.body;

      let patrimonyByPatrimonyNumber = await patrimonySchema.findOne({
        patrimonyNumber: patrimonyNumber,
      });

      if (patrimonyByPatrimonyNumber.length > 0) {
        return res
          .status(422)
          .json({ message: "Numero de patrimonio ja cadastrado" });
      }

      if (!name) {
        return res.status(422).json({ message: "Nome é obrigatorio" });
      }

      if (!priceCost) {
        return res
          .status(422)
          .json({ message: "Preço de custo é obrigatorio" });
      }

      if (!category) {
        return res.status(422).json({ message: "Categoria é obrigatorio" });
      }

      // Add createdAt and stock
      let realStock = initialStock;
      let createdAt = new Date(Date.now());

      const patrimony = new patrimonySchema({
        name,
        priceCost,
        description,
        category,
        patrimonyNumber,
        initialStock,
        realStock,
        createdAt,
      });

      await patrimony.save();
      return res
        .status(200)
        .json({ message: "Produto cadastrado com sucesso!", user: patrimony });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erro Interno do servidor, tente novamente mais tarde",
      });
    }
  }

  static async updatePatrimony(req, res) {
    try {
      const {
        name,
        priceCost,
        description,
        category,
        realStock,
        patrimonyNumber,
        moveStock,
      } = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(422).json({ message: "ID não informado" });
      }

      const patrimony = await patrimonySchema.findById(id);

      if (!patrimony) {
        return res.status(404).json({ message: "Patrimonio não encontrado" });
      }

      if (patrimony.patrimonyNumber !== patrimonyNumber) {
        let productsByBarCode = await patrimonySchema.find({
          barCode: { $regex: patrimonyNumber, $options: "i" },
        });

        if (productsByBarCode.length > 0) {
          return res.status(422).json({
            message: "Já existe um produto com esse codigo de patrimônio",
          });
        }

        patrimony.patrimonyNumber = patrimonyNumber;
      }

      patrimony.name = name;
      patrimony.priceCost = priceCost;
      patrimony.description = description;
      patrimony.category = category;
      patrimony.moveStock = moveStock;
      patrimony.realStock = realStock;
      patrimony.updatedAt = new Date(Date.now());

      await patrimony.save();

      return res
        .status(200)
        .json({ message: "Produto editado com sucesso", data: patrimony });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erro Interno do servidor, tente novamente mais tarde",
      });
    }
  }

  static async deletepatrimony(req, res) {
    const { id } = req.params;

    const patrimony = await patrimonySchema.findById(id);
    if (!patrimony) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    await patrimony.remove();
    return res.status(200).json({ message: "Produto excluido com sucesso" });
  }
};
