const express = require("express");
const cashiersRouter = express.Router();
const CashiersController = require("../controller/cashiers.controller");
const verifyToken = require("../utils/verifyToken");

cashiersRouter.get("/cashiers", verifyToken, CashiersController.getCashiers);
cashiersRouter.get('getCashiersData/:id', verifyToken, CashiersController.getCashiersData)
cashiersRouter.post("/openCashier", verifyToken, CashiersController.openCashier);
cashiersRouter.post("/closeCashier/:id", verifyToken, CashiersController.closeCashier);
cashiersRouter.post("/addCashier/:id", verifyToken, CashiersController.addCashier);
cashiersRouter.post("/removeCashier/:id", verifyToken, CashiersController.removeCashier);

module.exports = cashiersRouter;