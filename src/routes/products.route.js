const multer = require("multer");

const express = require("express");
const productsRouter = express.Router();
const cors = require("cors");
const ProductsController = require("../controller/products.controller");
const verifyToken = require("../utils/verifyToken");

const upload = multer();

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
productsRouter.post(
  "/products/stock/import",
  cors(),
  upload.single('file'),
  ProductsController.importProductsExcel
);
productsRouter.get(
  "/products/stock/export",
  cors(),
  verifyToken,
  ProductsController.exportProductsExcel
);

module.exports = productsRouter;
