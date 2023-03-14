const HomeController = require("../controller/home.controller");
const HomeRouter = require("express").Router();
const verifyToken = require("../utils/verifyToken");

HomeRouter.get("/getInfos", verifyToken, HomeController.getHomeInfo);

module.exports = HomeRouter;