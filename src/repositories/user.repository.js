const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const bcrypt = require("bcrypt");

class UserRepository {
  async createUser(userData) {
    try {
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error("El usuario ya existe");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(userData.password, salt);

      const newCart = new cartModel();
      await newCart.save();

      const newUser = new userModel({
        ...userData,
        password: hash,
        cart: newCart._id,
      });

      await newUser.save();
      return newUser;
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
}

module.exports = UserRepository;
