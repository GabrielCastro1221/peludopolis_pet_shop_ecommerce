const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const { createHash } = require("../utils/hash.util");

class UserRepository {
  async createUser(userData) {
    try {
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error("El usuario ya existe");
      }
      const hashedPassword = createHash(userData.password);
      const newCart = new cartModel();
      await newCart.save();
      const newUser = new userModel({
        ...userData,
        password: hashedPassword,
        cart: newCart._id,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await userModel.find({}).lean();
      if (users.length === 0) {
        throw new Error("No se encontraron usuarios");
      }
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, updateData) {
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changeRole(id, newRole) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { role: newRole },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserProfile(id) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async subscribeToNewsletter(email) {
    try {
      if (!email) throw new Error("El email es requerido.");

      const user = await userModel.findOne({ email });
      if (!user) throw new Error("Usuario no encontrado.");

      if (user.newsletter === "suscrito") {
        throw new Error("Ya estas suscrito al boletin informativo.");
      }

      user.newsletter = "suscrito";
      await user.save();
      return { message: "Suscripción al boletin informativo exitosa." };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserRepository;
