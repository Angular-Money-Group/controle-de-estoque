const userSchema = require("../models/userSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

module.exports = class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email é obrigatorio" });
    }

    if (!password) {
      return res.status(422).json({ message: "Senha é obrigatorio" });
    }

    //Check if exist user
    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Usuario não encontrado" });
    }

    try {
    //Check password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha invalida" });
    }

      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
      res
        .status(200)
        .json({ message: "Autenticação realizada com sucesso!", token: token });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Erro Interno do servidor, tente novamente mais tarde" });
    }
  }

  static async register(req, res) {
    const { name, email, role, password } = req.body;

    //validations
    if (!name) return res.status(422).json({ message: "Nome é obrigatorio" });

    if (!role) return res.status(422).json({ message: "Cargo é obrigatorio" });

    if (!email) return res.status(422).json({ message: "Email é obrigatorio" });

    if (!password) return res.status(422).json({ message: "Senha é obrigatorio" });

    //Check if exist user
    const userExists = await userSchema.findOne({ email: email });

    if (userExists) {
      return res
        .status(422)
        .json({ message: "Email já cadastrado! Utilize outro email" });
    }

    // Crate Password
    const salt = await bcrypt.genSalt(12);
    const passHash = await bcrypt.hash(password, salt);

    //Create User
    const user = new userSchema({
      name,
      email,
      role,
      password: passHash,
    });
    try {
      await user.save();
      res.status(201).json({ message: "Usuario Criado com sucesso!" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Erro Interno do servidor, tente novamente mais tarde" });
    }

    return res
      .status(500)
      .json({ message: "Erro Interno do servidor, tente novamente mais tarde" });
  }

  static async forgotPassword(req, res) {
    if (!req.query.email)
      return res.status(422).json({ message: "Email é obrigatório" });
    try {
      const user = await userSchema.findOne({ email: req.query.email });

      if (!user)
        return res
          .status(400)
          .json({ message: "Usuário não cadastrado!" });

      const token = crypto.randomBytes(32).toString("hex");
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await userSchema.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          password: 'resetPassword1234321',
          passwordResetExpires: now,
        },
      });

      const link = `Nova senha = ${token}`;
      
      await sendEmail(user.email, "Password reset", link);

      return res.status(200).json({ message: "Email Enviado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro interno, tente novamente mais tarde" });
    }
  }

  static async resetPassword(req, res) {
    try {
      const password = req.query.password;

      if (!password)
        return res.status(422).json({ message: "Senha é obrigatorio" });

      const user = await userSchema.findById(req.params.userId);
      if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

      const token = req.params.token;
      if (!token)
        return res.status(400).json({ message: "Token inválido ou expirado" });

      const salt = await bcrypt.genSalt(12);
      const passHash = await bcrypt.hash(password, salt);

      await userSchema.findByIdAndUpdate(user.id, {
        $set: {
          password: passHash,
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        },
      });

      await user.save();
      res.status(200).json({message: "password reset sucessfully."});
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  }
};
