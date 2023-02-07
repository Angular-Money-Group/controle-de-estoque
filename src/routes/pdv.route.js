const express = require("express");
const pdvRouter = express.Router();
const PDVController = require("../controller/pdv.controller");
const verifyToken = require("../utils/verifyToken");

pdvRouter.post("/createPDV", verifyToken, PDVController.createPDV);

module.exports = pdvRouter;