const adoptionsModel = require("../models/adoptions.model");
const UserModel = require("../models/user.model"); // Import User model
const { logger } = require("../middlewares/logger.middleware");

class AdoptionsRepository {
  async createPet({
    name,
    species,
    breed,
    age,
    gender,
    description,
    photo,
    medicalHistory = [],
    thumbnails = [],
    owner,
  }) {
    try {
      if (
        !name ||
        !species ||
        !breed ||
        !age ||
        !gender ||
        !description ||
        !photo ||
        !owner
      ) {
        throw new Error("Todos los campos son requeridos");
      }

      const newPet = new adoptionsModel({
        name,
        species,
        description,
        photo,
        thumbnail: thumbnails,
        age,
        gender,
        medicalHistory,
        breed,
        owner,
      });
      await newPet.save();

      const user = await UserModel.findById(owner);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      user.pets.push(newPet._id);
      await user.save();

      return {
        message: "Mascota en adopción creada y asignada con éxito",
        pet: newPet,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPets({ page = 1, limit = 6, species, gender }) {
    try {
      const query = {};
      if (species) query.species = species;
      if (gender) query.gender = gender;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
      };

      const result = await adoptionsModel.paginate(query, options);
      return result;
    } catch (error) {
      throw new Error("Error al obtener las mascotas: " + error.message);
    }
  }

  async findPetById(id) {
    try {
      const pet = await adoptionsModel.findById(id).populate("owner");
      if (!pet) {
        throw new Error("Mascota no encontrada");
      }
      return pet;
    } catch (error) {
      throw new Error("Error al buscar la mascota: " + error.message);
    }
  }

  async updatePet(id, updateData) {
    try {
      const pet = await adoptionsModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!pet) {
        throw new Error("Mascota no encontrada");
      }
      return pet;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePet(id) {
    try {
      const deletePet = await adoptionsModel.findByIdAndDelete(id);
      if (!deletePet) {
        logger.warning("Mascota no encontrada");
        throw new Error("Mascota no encontrada");
      }
      logger.info("Mascota eliminada");
      return deletePet;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AdoptionsRepository;
