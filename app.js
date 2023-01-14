require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const productsRouter = require("./src/routes/products.route");
const authRouter = require("./src/routes/auth.route");

app.use(express.json());
app.use(cors())
app.use(productsRouter);
app.use(authRouter);
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster.rhhrs5n.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Conectado com sucesso"))
  .catch((err) => console.log(err));

//Routes
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
