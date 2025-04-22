const adoptionModel = require("../models/adoption.model");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

class AdoptionRepository {
  async createAdoptionRequest(data) {
    try {
      const {
        pet,
        adopter_name,
        adopter_lastname,
        adopter_email,
        adopter_phone,
        adopter_address,
        adopter_city,
        adopter_ID,
        adopter_photo,
        observations,
        members_family = [],
      } = data;

      const requiredFields = [
        pet,
        adopter_name,
        adopter_lastname,
        adopter_email,
        adopter_phone,
        adopter_address,
        adopter_city,
        adopter_ID,
        adopter_photo,
      ];

      if (requiredFields.some((field) => !field)) {
        throw new Error("Todos los campos requeridos deben ser completados");
      }

      const newRequest = new adoptionModel({
        code: uuidv4(),
        pet: new mongoose.Types.ObjectId(pet),
        adopter_name,
        adopter_lastname,
        adopter_email,
        adopter_phone,
        adopter_address,
        adopter_city,
        adopter_ID,
        adopter_photo,
        observations,
        members_family,
      });

      await newRequest.save();

      return {
        message: "Solicitud de adopción creada con éxito",
        adoptionRequest: newRequest,
      };
    } catch (error) {
      throw new Error("Error al crear la solicitud: " + error.message);
    }
  }

  async getAdoptionRequests(page = 1, limit = 6) {
    try {
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: "pet",
      };
      return await adoptionModel.paginate({}, options);
    } catch (error) {
      throw new Error("Error al obtener las solicitudes: " + error.message);
    }
  }

  async getAdoptionRequestById(id) {
    try {
      const request = await adoptionModel.findById(id).populate("pet");
      if (!request) throw new Error("Solicitud no encontrada");
      return { message: "Solicitud encontrada con éxito", request };
    } catch (error) {
      throw new Error("Error al obtener la solicitud: " + error.message);
    }
  }

  async updateAdoptionRequest(id, data) {
    try {
      const updated = await adoptionModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updated) throw new Error("Solicitud no encontrada");
      return updated;
    } catch (error) {
      throw new Error("Error al actualizar la solicitud: " + error.message);
    }
  }

  async deleteAdoptionRequest(id) {
    try {
      const deleted = await adoptionModel.findByIdAndDelete(id);
      if (!deleted) throw new Error("Solicitud no encontrada");
      return { message: "Solicitud eliminada con éxito" };
    } catch (error) {
      throw new Error("Error al eliminar la solicitud: " + error.message);
    }
  }
}

module.exports = AdoptionRepository;
