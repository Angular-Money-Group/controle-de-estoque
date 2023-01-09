const express = require("express");
const authRouter = express.Router();

const AuthController = require("../controller/auth.controller");

authRouter.post('/auth/v1/login', AuthController.login)
authRouter.post('/auth/v1/register', AuthController.register)

module.exports = authRouter; 