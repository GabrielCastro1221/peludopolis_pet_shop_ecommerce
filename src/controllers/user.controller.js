const userModel = require("../models/user.model");
const UserRepository = require("../repositories/user.repository");
const userR = new UserRepository();

class UserController {
  async createUser(req, res) {
    try {
      const userData = req.body;
      await userR.createUser(userData);
      res.redirect("/perfil-admin");
    } catch (error) {
      res.render("profileAdmin", { message: error.message });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    try {
      const updatedUser = await userR.updateUser(id, req.body);
      res
        .status(200)
        .json({ message: "Usuario actualizado", usuario: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await userR.deleteUser(id);
      res
        .status(200)
        .json({ message: "Usuario eliminado", usuario: deletedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async changeRolAdmin(req, res) {
    const { id } = req.params;
    try {
      const updatedUser = await userR.changeRole(id, "admin");
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async changeRolUser(req, res) {
    const { id } = req.params;
    try {
      const updatedUser = await userR.changeRole(id, "usuario");
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getUserProfile(req, res) {
    const userId = req.userId;
    try {
      const user = await userR.getUserProfile(userId);
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
  }

  subscribeToNewsletter = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "El email es requerido." });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      if (user.newsletter === "suscrito") {
        return res
          .status(400)
          .json({ message: "El usuario ya está suscrito al newsletter." });
      }
      user.newsletter = "suscrito";
      await user.save();
      res.status(200).json({ message: "Suscripción al newsletter exitosa." });
    } catch (error) {
      console.error("Error al suscribirse al newsletter:", error);
      res.status(500).json({ message: "Error del servidor." });
    }
  };
}

module.exports = UserController;
