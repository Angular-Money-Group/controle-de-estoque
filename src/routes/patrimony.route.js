const express = require("express");
const patrimonyRouter = express.Router();
const patrimonyController = require("../controller/patrimony.controller");

patrimonyRouter.get("/patrimony", verifyToken, patrimonyController.getPatrimony);
patrimonyRouter.post("/patrimony", verifyToken, patrimonyController.createPatrimony);
patrimonyRouter.put("/patrimony/:id", verifyToken, patrimonyController.updatePatrimony);
patrimonyRouter.delete(
  "/patrimony/:id",
  verifyToken,
  () => 
  patrimonyController.deletePatrimony
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
