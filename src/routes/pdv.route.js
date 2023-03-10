const express = require("express");
const pdvRouter = express.Router();
const PDVController = require("../controller/pdv.controller");
const verifyToken = require("../utils/verifyToken");

pdvRouter.get("/getPDV", verifyToken, PDVController.getByDayPDV);
pdvRouter.get("/getPDV/:id", verifyToken, PDVController.getPDV);
pdvRouter.post("/createPDV", verifyToken, PDVController.createPDV);

module.exports = pdvRouter;