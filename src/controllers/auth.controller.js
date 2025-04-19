const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const wishlistModel = require("../models/wishList.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configObject = require("../config/env.config");
const { generarResetToken } = require("../utils/resetToken.util");
const { createHash, isValidPassword } = require("../utils/hash.util");
const MailerController = require("../services/mailer.service");

const mailer = new MailerController();

class AuthController {
  generateToken = (user) => {
    return jwt.sign(
      { id: user._id, role: user.role },
      configObject.auth.jwt_secret,
      {
        expiresIn: "15d",
      }
    );
  };

  register = async (req, res) => {
    const {
      name,
      last_name,
      email,
      password,
      age,
      role,
      gender,
      phone,
      address,
      city,
    } = req.body;

    try {
      if (!name || !email || !password) {
        return res.render("login", {
          message: "Todos los campos son requeridos",
        });
      }

      const user = await userModel.findOne({ email });
      if (user) {
        return res.render("login", { message: "El usuario ya existe" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newCart = new cartModel();
      await newCart.save();

      const newWishList = new wishlistModel();
      await newWishList.save();

      const newUser = new userModel({
        name,
        last_name,
        email,
        password: hash,
        age,
        role,
        gender,
        phone,
        cart: newCart._id,
        wishlist: newWishList._id,
        address,
        city,
      });

      await newUser.save();
      return res.render("login", { success: "Registro exitoso" });
    } catch (error) {
      res
        .status(500)
        .render("login", { message: "Ocurrió un error en el servidor" });
    }
  };

  login = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Credenciales incorrectas" });
      }

      const token = this.generateToken(user);
      const { password, ...rest } = user._doc;

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        data: {
          ...rest,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  RequestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.render("resetPass", { error: "Usuario no encontrado" });
      }
      const token = generarResetToken();
      user.token_reset = {
        token: token,
        expire: new Date(Date.now() + 3600000),
      };
      await user.save();
      await mailer.SendEmailRecoveryPassword(email, token);
      res.redirect("/confirm");
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "error interno del servidor",
        error: err.message,
      });
    }
  };

  resetPassword = async (req, res) => {
    const { email, password, token } = req.body;
    try {
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.render("resetPass", { error: "Usuario no encontrado" });
      }
      const resetToken = user.token_reset;
      if (!resetToken || resetToken.token !== token) {
        return res.render("resetPass", { error: "Token invalido" });
      }
      const ahora = new Date();
      if (ahora > resetToken.expire) {
        return res.render("resetPass", { error: "El token expiro" });
      }
      if (isValidPassword(password, user)) {
        return res.render("resetPass", {
          error: "La nueva contraseña no puede ser igual a a la anterior",
        });
      }
      user.password = createHash(password);
      user.token_reset = undefined;
      await user.save();
      return res.redirect("/login");
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "error interno del servidor",
        error: err.message,
      });
    }
  };
}

module.exports = AuthController;
