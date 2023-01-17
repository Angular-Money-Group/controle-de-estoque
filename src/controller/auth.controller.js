const userSchema = require("../models/userSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

module.exports = class AuthController {
  static async login(req, res) {
    if (req.method != "POST") { 
      return res
        .status(405)
        .json({ msg: "Metodo invalido, Utilize o Metodo POST para utilizar!" });
    }

    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "Email é obrigatorio" });
    }

    if (!password) {
      return res.status(422).json({ msg: "Senha é obrigatorio" });
    }

    //Check if exist user
    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ msg: "Usuario não encontrado" });
    }

    //Check password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha invalida" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
      res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso!", token: token });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ msg: "Erro Interno do servidor, tente novamente mais tarde" });
    }
  }

  static async register(req, res) {
    const { name, email, role, password, confirmpassword } = req.body;

    //validations
    if (!name) return res.status(422).json({ msg: "Nome é obrigatorio" });

    if (!role) return res.status(422).json({ msg: "Cargo é obrigatorio" });

    if (!email) return res.status(422).json({ msg: "Email é obrigatorio" });

    if (!password) return res.status(422).json({ msg: "Senha é obrigatorio" });

    if (password !== confirmpassword) return res.status(422).json({ msg: "As senhas não conferem" });

    //Check if exist user
    const userExists = await userSchema.findOne({ email: email });

    if (userExists) {
      return res
        .status(422)
        .json({ msg: "Email já cadastrado! Utilize outro email" });
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
      res.status(201).json({ msg: "Usuario Criado com sucesso!" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ msg: "Erro Interno do servidor, tente novamente mais tarde" });
    }

    return res
      .status(500)
      .json({ msg: "Erro Interno do servidor, tente novamente mais tarde" });
  }

  static async forgotPassword(req, res) {
    if (!req.body.email)
      return res.status(422).json({ msg: "Email é obrigatório" });
    try {
      const user = await userSchema.findOne({ email: req.body.email });

      if (!user)
        return res
          .status(400)
          .json({ msg: "Usuário com e-mail fornecido não existe" });

      const token = crypto.randomBytes(32).toString("hex");
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await userSchema.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token}`;

      await sendEmail(user.email, "Password reset", link);

      return res.status(200).json({ msg: "Email Enviado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Ocorreu um erro interno, tente novamente mais tarde" });
    }
  }

  static async resetPassword(req, res) {
    try {
      const password = req.body.password;

      if (!password)
        return res.status(422).json({ msg: "Senha é obrigatorio" });

      const user = await userSchema.findById(req.params.userId);
      if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

      const token = req.params.token;
      if (!token)
        return res.status(400).json({ msg: "Token inválido ou expirado" });

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
      res.status(203).json({msg: "password reset sucessfully."});
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  }
};
