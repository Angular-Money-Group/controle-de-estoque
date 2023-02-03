const PDVSchema = require("../models/pdvSchema");
const productsSchema = require("../models/productsSchema");

module.exports = class PDVController {
  static async createPDV(req, res) {
    const { userID, products, totalSell } = req.body;

    if (!userID || !products || !totalSell) {
      return res.status(422).json({ message: "Dados não informados" });
    }

    const newPDV = new PDVSchema({
      userID,
      products,
      totalSell,
      createdAt: Date.now(),
    });

    try {
      await newPDV.save();
      updateStock(products);
      return res.status(201).json({ message: "PDV criado com sucesso" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao criar PDV", err });
    }
  }
};

function updateStock(products) {
    products.forEach(async (product) => {
      const productDB = await productsSchema.findById(product.productID);
        console.log(productDB)
      if (!productDB) {
        throw console.error("Produto não encontrado");
      }

      productDB.realStock = productDB.realStock - product.quantity;
      productDB.moveStock = product.quantity;
      await productDB.save();
    });  
}
