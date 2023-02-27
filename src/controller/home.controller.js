const PDVSchema = require("../models/pdvSchema");
const productSchema = require("../models/productsSchema");
const patrimonySchema = require("../models/patrimonySchema");

module.exports = class HomeController {
  static async getHomeInfo(req, res) {
    try {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);

      var totalSell = { allDays: 0, days: [] };
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
        if (element.realStock > 0 && element.priceCost > 0 && element.isActive === 'Ativo') {
          totalPatrimony += element.priceCost * element.realStock;
        }
      });

      pdv.forEach((element) => {
        if(element.state === 'Fechado') {
          element.createdAt = new Date(element.createdAt);
          totalSell.allDays += element.totalSell;
          totalSell.days.push({day: element.createdAt.getDate(), value: element.totalSell});
        };
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
