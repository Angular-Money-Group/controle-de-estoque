const express = require("express");
const patrimonyRouter = express.Router();
const patrimonyController = require("../controller/patrimony.controller");
const verifyToken = require("../utils/verifyToken");

patrimonyRouter.get("/patrimony", verifyToken, patrimonyController.getPatrimony);
patrimonyRouter.post("/patrimony", verifyToken, patrimonyController.createPatrimony);
patrimonyRouter.put("/patrimony/:id", verifyToken, patrimonyController.updatePatrimony);
patrimonyRouter.delete(
  "/patrimony/:id",
  verifyToken,
  patrimonyController.deletepatrimony
);

module.exports = patrimonyRouter;
