const patrimonySchema = require("../models/patrimony.model");

module.exports = class patrimonysController {
  static async getPatrimony(req, res) {
    const patrimony = await patrimonysSchema.find();
    return res.status(200).json(patrimony);
  }

  static async createPatrimony(req, res) {
    let {
      name,
      priceCost,
      description,
      category,
      imageBase64,
      initialStock,
    } = req.body;

    //validations
    if (createdAt) {
      return res.status(422).json({ msg: "Não é permitido enviar a data de criação, ela será automatica!" });
    }

    if (updatedAt) {
      return res.status(422).json({ msg: "Não é permitido enviar a data de atualização, ela será automatica!" });
    }

    if (!name) {
      return res.status(422).json({ msg: "Nome é obrigatorio" });
    }

    if (!priceCost) {
      return res.status(422).json({ msg: "Preço de custo é obrigatorio" });
    }
    
    if (!priceSell) {
      return res.status(422).json({ msg: "Preço de venda é obrigatorio" });
    }

    if (!barCode) {
      return res.status(422).json({ msg: "Codigo de Barras é obrigatorio" });
    }

    if (!category) {
      return res.status(422).json({ msg: "Categoria é obrigatorio" });
    }
    
    if (!initialStock) {
      return res.status(422).json({ msg: "Quantidade é obrigatorio" });
    }

    // Add createdAt and stock
    realStock = initialStock;
    createdAt = new Date(Date.now())

    const patrimony = new patrimonysSchema({
      name,
      priceCost,
      priceSell,
      barCode,
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
      return res.status(200).json({ msg: "Produto cadastrado com sucesso!", user: patrimony });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ msg: "Erro Interno do servidor, tente novamente mais tarde" });
    }
  }

  static async entrypatrimony(req, res) {
        
    const {  
      name,
      priceCost,
      priceSell,
      description,
      category,
      moveStock,
      imageBase64, 
    } = req.body;
    const { id } = req.params;
    if(!id) {
      return res.status(422).json({ msg: "ID não informado" });
    }

    const patrimony = await patrimonysSchema.findById(id);

    if (!patrimony) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    } else {
      patrimony.name = name;
      patrimony.priceCost = priceCost;
      patrimony.priceSell = priceSell;
      patrimony.description = description;
      patrimony.category = category;
      patrimony.imageBase64 = imageBase64;
      patrimony.moveStock = moveStock;
      patrimony.realStock += moveStock;
      patrimony.updatedAt = new Date(Date.now());

      await patrimony.save();

      return res
        .status(200)
        .json({ msg: "Produto editado com sucesso", patrimony: patrimony });
    }
  }

  static async leavepatrimony(req, res) {
    const {  
      name,
      priceCost,
      priceSell,
      description,
      imageBase64,
      moveStock
    } = req.body;

    const { id } = req.params;

    if(!id) {
      return res.status(422).json({ msg: "ID não informado" });
    }

    const patrimony = await patrimonysSchema.findById(id);

    if (!patrimony) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    } else {
      patrimony.name = name;
      patrimony.priceCost = priceCost;
      patrimony.priceSell = priceSell;
      patrimony.description = description;
      patrimony.category = category;
      patrimony.imageBase64 = imageBase64;
      patrimony.moveStock = moveStock;
      patrimony.realStock -= moveStock;
      patrimony.updatedAt = new Date(Date.now());

      await patrimony.save();

      return res
        .status(200)
        .json({ msg: "Produto editado com sucesso", patrimony: patrimony });
    }
  }

  static async deletepatrimony(req, res) {
    const { id } = req.params;

    const patrimony = await patrimonysSchema.findById(id);

    if (!patrimony) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    } else {
      await patrimony.remove();

      return res.status(200).json({ msg: "Produto excluido com sucesso" });
    }
  }
}
