const express = require("express");
const productsRouter = express.Router();
const cors = require("cors");
const ProductsController = require("../controller/products.controller");

productsRouter.get(
  "/products",
  cors(),
  verifyToken,
  ProductsController.getProducts
);
productsRouter.get(
  "/products/:id",
  cors(),
  verifyToken,
  ProductsController.getProductsById
);
productsRouter.post(
  "/products",
  cors(),
  verifyToken,
  ProductsController.createProduct
);
productsRouter.put(
  "/products/:id",
  cors(),
  verifyToken,
  ProductsController.updateProduct
);
productsRouter.delete(
  "/products/:id",
  cors(),
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
    return res.status(403).json({ message: "Token de Autenticação Invalido" });
  }
}

module.exports = productsRouter;
