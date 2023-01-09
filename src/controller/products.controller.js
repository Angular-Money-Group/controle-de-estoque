const productsSchema = require("../models/productsSchema");

module.exports = class ProductsController {
  static async getProducts(req, res) {
    const product = await productsSchema.find();
    return res.status(200).json(product);
  }

  static async createProduct(req, res) {
     
    var {
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

    const product = new productsSchema({
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
      await product.save();
      return res.status(200).json({ msg: "Produto cadastrado com sucesso!", user: product });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ msg: "Erro Interno do servidor, tente novamente mais tarde" });
    }
  }

  static async entryProduct(req, res) {
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

    const product = await productsSchema.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    } else {
      product.name = name;
      product.priceCost = priceCost;
      product.priceSell = priceSell;
      product.description = description;
      product.category = category;
      product.imageBase64 = imageBase64;
      product.moveStock = moveStock;
      product.realStock += moveStock;
      product.updatedAt = new Date(Date.now());

      await product.save();

      return res
        .status(200)
        .json({ msg: "Produto editado com sucesso", product: product });
    }
  }

  static async leaveProduct(req, res) {
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

    const product = await productsSchema.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    } else {
      product.name = name;
      product.priceCost = priceCost;
      product.priceSell = priceSell;
      product.description = description;
      product.category = category;
      product.imageBase64 = imageBase64;
      product.moveStock = moveStock;
      product.realStock -= moveStock;
      product.updatedAt = new Date(Date.now());

      await product.save();

      return res
        .status(200)
        .json({ msg: "Produto editado com sucesso", product: product });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    const product = await productsSchema.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    } else {
      await product.remove();

      return res.status(200).json({ msg: "Produto excluido com sucesso" });
    }
  }
}
