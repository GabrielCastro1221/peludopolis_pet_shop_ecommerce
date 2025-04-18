const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const bcrypt = require("bcrypt");

class UserController {
  createUser = async (req, res) => {
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
        return res.render("profileAdmin", {
          message: "Todos los campos son requeridos",
        });
      }

      const user = await userModel.findOne({ email });
      if (user) {
        return res.render("profileAdmin", { message: "El usuario ya existe" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newCart = new cartModel();
      await newCart.save();

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
        address,
        city,
      });

      await newUser.save();
      return res.redirect("/perfil-admin");
    } catch (error) {
      res.render("profileAdmin", {
        message: "Ocurrió un error en el servidor",
      });
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ message: "Usuario actualizado", usuario: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ message: "Usuario eliminado", usuario: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  changeRolAdmin = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }
      const newRol = user.role === "usuario" ? "admin" : "usuario";
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { role: newRol },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  };

  changeRolUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }
      const newRol = user.role === "admin" ? "usuario" : "admin";
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { role: newRol },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  };

  getUserProfile = async (req, res) => {
    const userId = req.userId;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      const { password, ...rest } = user._doc;
      res.status(200).json({
        success: true,
        message: "Informacion del perfil obtenida exitosamente",
        data: { ...rest },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Error al obtener la informacion del perfil",
      });
    }
  };
}

module.exports = UserController;
