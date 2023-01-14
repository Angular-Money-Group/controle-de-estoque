const express = require("express");
const authRouter = express.Router();
const cors = require('cors')
const AuthController = require("../controller/auth.controller");

authRouter.post('/auth/v1/login', cors(), AuthController.login)
authRouter.post('/auth/v1/register', cors(), AuthController.register)

module.exports = authRouter; 