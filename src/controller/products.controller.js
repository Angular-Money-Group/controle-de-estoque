const productsSchema = require("../models/productsSchema");
const { Readable } = require("stream");
const readline = require("readline");
const xlsx = require("xlsx");

module.exports = class ProductsController {
  static async getProducts(req, res) {
    if (req.query.filter) {
      // try {
        let productsByName = await productsSchema.paginate({name: { $regex: req.query.filter, $options: "i" },}, {
          page: req.query.page || 1,
          limit: req.query.limit || 10,
          sort: { createdAt: -1 },
          });
        let productsByBarCode = await productsSchema.paginate({
          barCode: { $regex: req.query.filter, $options: "i" },
        }, {
          page: req.query.page || 1,
          limit: req.query.limit || 10,
          sort: { createdAt: -1 },
          });

        let allProducts = productsByName.docs.length > 0 ? productsByName : productsByBarCode;
        return res.status(200).json({
          message: "Operação realizada com sucesso",
          ...allProducts
        });

    } else {
      let product = await productsSchema.paginate({}, {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        sort: { createdAt: -1 },
      });

      return res.status(200).json({
        message: "Operação realizada com sucesso",
        ...product
      });
    }
  }

  static async getProductsById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({ message: "ID não informado" });
    }

    const product = await productsSchema.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(200).json({  message: "Operação realizada com Sucesso" , data: product });
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
      const {
        name,
        priceCost,
        priceSell,
        barCode,
        description,
        category,
        moveStock,
      } = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(422).json({ message: "ID não informado" });
      }

      const product = await productsSchema.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      if (product.barCode !== barCode) {
        let productsByBarCode = await productsSchema.find({
          barCode: { $regex: barCode, $options: "i" },
        });

        if (productsByBarCode.length > 0) {
          return res.status(422).json({
            message: "Já existe um produto com esse codigo de barras",
          });
        }

        product.barCode = barCode;
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

  static async importProductsExcel(req, res) {
    try {
      const { file } = req;
      const { buffer } = file;
      const readleFile = new Readable();

      readleFile.push(buffer);
      readleFile.push(null);

      const productsLine = readline.createInterface({
        input: readleFile,
      });

      for await (const line of productsLine) {
        var [
          name,
          priceCost,
          priceSell,
          barCode,
          description,
          category,
          initialStock,
        ] = line.split(",");

        name = name.replace(/"/g, "");
        barCode = barCode.replace(/"/g, "");
        description = description.replace(/"/g, "");
        category = category.replace(/"/g, "");

        initialStock = initialStock.replace(/"/g, "");
        initialStock = Number(initialStock);

        initialStock < 0 ? (initialStock = 0) : initialStock;

        priceCost = priceCost.replace(/"/g, "");
        priceCost = Number(priceCost);



        priceSell = priceSell.replace(/"/g, "");
        priceSell = Number(priceSell);

        let productsByBarCode = await productsSchema.find({
          barCode: { $regex: barCode, $options: "i" },
        });

        if (productsByBarCode.length > 0) {
          productsByBarCode[0].name = name;
          productsByBarCode[0].priceCost = priceCost | 0;
          productsByBarCode[0].priceSell = priceSell | 0;
          productsByBarCode[0].description = name;
          productsByBarCode[0].category = category;
          productsByBarCode[0].realStock = initialStock | 0;
          productsByBarCode[0].updatedAt = Date.now();

          await productsByBarCode[0].save();
        } else {
          const product = new productsSchema({
            name: name,
            priceCost: priceCost | 0,
            priceSell: priceSell | 0,
            barCode: barCode,
            description: name,
            category: category,
            initialStock: initialStock | 0,
            realStock: initialStock | 0,
            createdAt: new Date(Date.now()),
          });
          await product.save();
        }

        console.log(
          name,
          priceCost,
          priceSell,
          barCode,
          description,
          category,
          initialStock
        );
      }

      return res
        .status(200)
        .json({ message: "Produtos importados com sucesso" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erro Interno do servidor, tente novamente mais tarde",
        err: err.message,
      });
    }
  }

  static async exportProductsExcel(req, res) {
    try {
      let products = await productsSchema.find();

      const productsArray = products.map((product) => {
        return [
          product.name,
          product.priceCost,
          product.priceSell,
          product.barCode,
          product.description,
          product.category,
          product.realStock,
        ];
      });

      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(productsArray);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Planilha1");

      const headerValues = ['Nome do produto', 'Preço de Custo', 'Preço de Venda', 'Código de Barras', 'Descrição', 'Categoria', 'Estoque'];

      xlsx.utils.sheet_add_aoa(worksheet, [headerValues], {origin: 'A1'});

      xlsx.writeFile(workbook, "products.xlsx");

      const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });


      res.setHeader(
        "Content-Disposition",
        "attachment; filename=products.xlsx"
      );
      res.status(200).send(buffer);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erro Interno do servidor, tente novamente mais tarde",
        err: err.message,
      });
    }
  }
};
