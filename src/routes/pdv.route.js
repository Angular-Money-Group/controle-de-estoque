const express = require("express");
const pdvRouter = express.Router();
const PDVController = require("../controller/pdv.controller");

pdvRouter.post("/createPDV", verifyToken, PDVController.createPDV);

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

module.exports = pdvRouter;