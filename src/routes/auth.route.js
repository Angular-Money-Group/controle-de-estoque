const express = require("express");
const authRouter = express.Router();
const cors = require('cors')
const AuthController = require("../controller/auth.controller");

authRouter.post('/auth/v1/login', cors(), AuthController.login)
authRouter.post('/auth/v1/register', cors(), AuthController.register)
authRouter.post('/auth/v1/forgotPassword', cors(), AuthController.forgotPassword)
authRouter.post('/auth/v1/resetPassword/:userId/:token', cors(), AuthController.resetPassword)
authRouter.post('/auth/v1/refreshToken', cors(), AuthController.refreshToken)

module.exports = authRouter; 