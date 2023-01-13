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

app.use(productsRouter);
app.use(authRouter);
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");

	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
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

app.listen(3000);
