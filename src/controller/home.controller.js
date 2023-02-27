const PDVSchema = require("../models/pdvSchema");
const productSchema = require("../models/productsSchema");
const patrimonySchema = require("../models/patrimonySchema");

module.exports = class HomeController {
  static async getHomeInfo(req, res) {
    try {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);

      var totalSell = 0;
      var totalStock = 0;
      var totalPatrimony = 0;

      if (!startDate || !endDate) {
        return res.status(422).json({ message: "Datas não informada" });
      }

      const pdv = await PDVSchema.find({
        createdAt: { $gte: startDate, $lte: endDate },
      });

      const products = await productSchema.find();
      const patrimony = await patrimonySchema.find();

      products.forEach((element) => {
        if (element.realStock > 0 && element.priceSell > 0) {
          totalStock += element.priceSell * element.realStock;
        }
      });

      patrimony.forEach((element) => {
        if (element.realStock > 0 && element.priceCost > 0) {
          totalPatrimony += element.priceCost * element.realStock;
        }
      });

      pdv.forEach((element) => {
        totalSell += element.totalSell;
      });

      return res.status(200).json({ totalSell, totalStock, totalPatrimony });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erro Interno do servidor, tente novamente mais tarde",
      });
    }
  }
};
