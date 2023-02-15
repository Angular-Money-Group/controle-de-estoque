const productsSchema = require("../models/productsSchema");

module.exports = class ProductsController {
  static async getProducts(req, res) {
    if (req.query.filter) {
      try {
        let productsByName = await productsSchema.find({
          name: { $regex: req.query.filter, $options: "i" },
        });
        let productsByBarCode = await productsSchema.find({
          barCode: { $regex: req.query.filter, $options: "i" },
        });

        let allProducts = [
          ...new Set([...productsByName, ...productsByBarCode]),
        ];
        return res.status(200).json({
          message: "Operação realizada com sucesso",
          data: allProducts,
          totalItens: allProducts.length,
        });
      } catch (err) {
        return res.status(400).json({ message: "Erro ao consultar", err });
      }
    } else {
      let product = await productsSchema.find();
      return res.status(200).json({
        message: "Operação realizada com sucesso",
        data: product,
        totalItens: product.length,
      });
    }
  }

  static async getProductsById(req, res) {
    const id = req.params;

    if (!id) {
      return res.status(422).json({ message: "ID não informado" });
    }

    const product = await productsSchema.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(200).json({ data: product });
  }

  static async createProduct(req, res) {
    try {
      let {
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
      } = req.body;

        let productsByBarCode = await productsSchema.find({
          barCode: { $regex: barCode, $options: "i" },
        });
        
        if (productsByBarCode.length > 0) {
          return res.status(422).json({
            message: "Já existe um produto com esse codigo de barras",
          });
        }

      if (!name) {
        return res.status(422).json({ message: "Nome é obrigatorio" });
      }

      if (!priceCost) {
        return res
          .status(422)
          .json({ message: "Preço de custo é obrigatorio" });
      }

      if (!priceSell) {
        return res
          .status(422)
          .json({ message: "Preço de venda é obrigatorio" });
      }

      if (!barCode) {
        return res
          .status(422)
          .json({ message: "Codigo de Barras é obrigatorio" });
      }

      if (!category) {
        return res.status(422).json({ message: "Categoria é obrigatorio" });
      }

      if (!initialStock) {
        return res
          .status(422)
          .json({ message: "Estoque Inicial é obrigatorio" });
      }

      // Add createdAt and stock
      realStock = initialStock;
      const createdAt = new Date(Date.now());

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
      });

      await product.save();
      return res
        .status(200)
        .json({ message: "Produto cadastrado com sucesso!", data: product });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erro Interno do servidor, tente novamente mais tarde",
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { name,
        priceCost,
        priceSell,
        barCode,
        description,
        category,
        moveStock } =
        req.body;
      const { id } = req.params;
      
      if (!id) {
        return res.status(422).json({ message: "ID não informado" });
      }

      if (!moveStock) {
        return res
          .status(422)
          .json({ message: "Movimento de estoque não informado" });
      }
      
      const product = await productsSchema.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      
      if(product.barCode !== barCode) {
        let productsByBarCode = await productsSchema.find({
          barCode: { $regex: barCode, $options: "i" },
        });
        
        if (productsByBarCode.length > 0) {
          return res.status(422).json({
            message: "Já existe um produto com esse codigo de barras",
          });
        }

        product.barCode = barCode
      }

      product.name = name;
      product.priceCost = priceCost;
      product.priceSell = priceSell;
      product.description = description;
      product.category = category;
      product.moveStock = moveStock;
      product.realStock += moveStock;
      product.updatedAt = Date.now();

      await product.save();

      return res
        .status(200)
        .json({ message: "Produto editado com sucesso", data: product });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erro Interno do servidor, tente novamente mais tarde",
        err,
      });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    const product = await productsSchema.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    } else {
      await product.remove();

      return res.status(200).json({ message: "Produto excluido com sucesso" });
    }
  }
};
