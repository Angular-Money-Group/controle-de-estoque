require("dotenv").config();

const port = 3001;

const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");

const app = express();
const dburi = process.env.DB_URI;

const productsRouter = require("./src/routes/products.route");
const authRouter = require("./src/routes/auth.route");
const patrimonyRouter = require("./src/routes/patrimony.route");
const pdvRouter = require("./src/routes/pdv.route");
const cashiersRouter = require("./src/routes/cashiers.route");

const docs = require("./src/docs");

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.use(cashiersRouter)
app.use(patrimonyRouter);
app.use(productsRouter);
app.use(authRouter);
app.use(pdvRouter);

// Connect to MongoDB
mongoose
  .connect(dburi)
  .then(() => console.log("Conectado com sucesso ao MongoDB"))
  .catch((err) => console.log(err));

//Routes
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(port, function () {
  console.log("Running in port", port);
});
