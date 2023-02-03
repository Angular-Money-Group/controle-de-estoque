const express = require("express");
const patrimonyRouter = express.Router();
const PatrimonyController = require("../controllers/patrimony.controller");

patrimonyRouter.get("/patrimony", verifyToken, PatrimonyController.getPatrimony);
patrimonyRouter.post("/patrimony", verifyToken, PatrimonyController.createPatrimony);
patrimonyRouter.put("/patrimony/:id", verifyToken, PatrimonyController.updatePatrimony);
patrimonyRouter.delete(
  "/patrimony/:id",
  verifyToken,
  PatrimonyController.deletePatrimony
);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(403).json({ message: "Token de Autenticação Invalido" });
  }
}

module.exports = patrimonyRouter;
