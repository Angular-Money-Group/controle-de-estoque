const PDVSchema = require("../models/pdvSchema");
const productSchema = require("../models/productsSchema");
const patrimonySchema = require("../models/patrimonySchema");

module.exports = class HomeController {
  static async getHomeInfo(req, res) {
    try {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);

      var totalSell = { allDays: 0, 
        days: [
          {day: 1, value: 0},
          {day: 2, value: 0},
          {day: 3, value: 0},
          {day: 4, value: 0},
          {day: 5, value: 0},
          {day: 6, value: 0},
          {day: 7, value: 0},
          {day: 8, value: 0},
          {day: 9, value: 0},
          {day: 10, value: 0},
          {day: 11, value: 0},
          {day: 12, value: 0},
          {day: 13, value: 0},
          {day: 14, value: 0},
          {day: 15, value: 0},
          {day: 16, value: 0},
          {day: 17, value: 0},
          {day: 18, value: 0},
          {day: 19, value: 0},
          {day: 20, value: 0},
          {day: 21, value: 0},
          {day: 22, value: 0},
          {day: 23, value: 0},
          {day: 24, value: 0},
          {day: 25, value: 0},
          {day: 26, value: 0},
          {day: 27, value: 0},
          {day: 28, value: 0},
          {day: 29, value: 0},
          {day: 30, value: 0},
          {day: 31, value: 0},
        ] };
      var totalStock = 0;
      var totalPatrimony = 0;


      if (!startDate || !endDate) {
        return res.status(422).json({ message: "Datas não informada" });
      }

      const pdv = await PDVSchema.find({
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });

      const products = await productSchema.find();
      const patrimony = await patrimonySchema.find();

      products.forEach((element) => {
        if (element.realStock > 0 && element.priceSell > 0) {
          totalStock += element.priceSell * element.realStock;
        }
      });

      patrimony.forEach((element) => {
        if (element.realStock > 0 && element.priceCost > 0 && element.isActive === true) {
          totalPatrimony += element.priceCost * element.realStock;
        }
      });

      pdv.forEach((element) => {
          element.createdAt = new Date(element.createdAt);
          totalSell.allDays += element.totalSell;
          totalSell.days.forEach((day) => {
            if(day.day === element.createdAt.getDate()) {
              day.value += element.totalSell;
            }
          });
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
