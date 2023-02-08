const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = require("../models/userSchema");

const verifyToken = async (req, res, next) => {
  try{
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      if(!bearerToken) return res.status(401).json({ message: "Token de Autenticação Invalido" });

      req.token = bearerToken;
  
      const decoded = jwt.verify(bearerToken, process.env.SECRET);
    
      // Check if refresh token exists in database
      const user = await userSchema.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ message: 'Token de Autenticação Invalido!' });
      } else {
        next();
      }
    } else {
      return res.status(401).json({ message: "Token de Autenticação Invalido" });
    }
  } catch (err) {
    console.log(err);
    if(err.message === "jwt expired") return res.status(401).json({ message: "Token de Autenticação Expirado" });
    if(err.message === "jwt malformed") return res.status(401).json({ message: "Token de Autenticação Invalido" });

    return res.status(500).json({ message: "Erro interno do servidor" });
  }
  }

module.exports = verifyToken;