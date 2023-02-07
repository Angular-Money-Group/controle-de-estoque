const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = require("../models/userSchema");

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
  
      const decoded = jwt.verify(bearerToken, process.env.SECRET);
    
      // Check if refresh token exists in database
      const user = await userSchema.findOne({ email: decoded.email });
      
      if (!user) {
        return res.status(403).json({ message: 'Token de Autenticação Invalido!' });
      } else {
        next();
      }
    } else {
      return res.status(403).json({ message: "Token de Autenticação Invalido" });
    }
  }

module.exports = verifyToken;