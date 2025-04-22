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
        message: "Información del perfil obtenida exitosamente",
        data: { ...rest },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Error al obtener la información del perfil",
      });
    }
  }

  async subscribeToNewsletter(req, res) {
    try {
      const { email } = req.body;
      const result = await userR.subscribeToNewsletter(email);
      res.status(200).json(result);
    } catch (error) {
      if (
        error.message === "El email es requerido." ||
        error.message === "Usuario no encontrado." ||
        error.message === "Ya estas suscrito al boletin informativo."
      ) {
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: "Error del servidor." });
    }
  }
}

module.exports = UserController;
