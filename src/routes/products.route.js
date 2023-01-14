const express = require("express");
const productsRouter = express.Router();

const ProductsController = require("../controller/products.controller");
const AuthController = require("../controller/auth.controller");

productsRouter.get("/products", verifyToken, ProductsController.getProducts);
productsRouter.post("/products", verifyToken, ProductsController.createProduct);
productsRouter.put(
  "/products/entry/:id",
  verifyToken,
  ProductsController.entryProduct
);
productsRouter.put(
  "/products/leave/:id",
  verifyToken,
  ProductsController.leaveProduct
);
productsRouter.delete(
  "/products/:id",
  verifyToken,
  ProductsController.deleteProduct
);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(403).json({  message: "Token de Autenticação Invalido" });
  }
}

module.exports = productsRouter;
