const patrimonySchema = require("../models/patrimony.model");

module.exports = class PatrimonyController {
  static async getPatrimony(req, res) {
    const patrimony = await patrimonysSchema.find();
    return res
      .status(200)
      .json({ message: "Operação realizada com sucesso!", data: patrimony });
  }

  static async createPatrimony(req, res) {
    let { name, priceCost, description, category, initialStock } =
      req.body;

    if (!name) {
      return res.status(422).json({ message: "Nome é obrigatorio" });
    }

    if (!priceCost) {
      return res.status(422).json({ message: "Preço de custo é obrigatorio" });
    }

    if (!category) {
      return res.status(422).json({ message: "Categoria é obrigatorio" });
    }

    // Add createdAt and stock
    var realStock = initialStock;
    var createdAt = new Date(Date.now());

    const patrimony = new patrimonysSchema({
      name,
      priceCost,
      description,
      category,
      imageBase64,
      initialStock,
      moveStock,
      realStock,
      createdAt,
      updatedAt,
    });

    try {
      await patrimony.save();
      return res
        .status(200)
        .json({ message: "Produto cadastrado com sucesso!", user: patrimony });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({
          message: "Erro Interno do servidor, tente novamente mais tarde",
        });
    }
  }

  static async updatePatrimony(req, res) {
    const { name, priceCost, description, category, realStock, moveStock } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({ message: "ID não informado" });
    }

    const patrimony = await patrimonySchema.findById(id);

    if (!patrimony) {
      return res.status(404).json({ message: "Patrimonio não encontrado" });
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
      .json({ message: "Produto editado com sucesso", data: product });
  }

  static async deletepatrimony(req, res) {
    const { id } = req.params;

    const patrimony = await patrimonysSchema.findById(id);

    if (!patrimony) {
      return res.status(404).json({ message: "Produto não encontrado" });
    } else {
      await patrimony.remove();

      return res.status(200).json({ message: "Produto excluido com sucesso" });
    }
  }
};
