const eventModel = require("../models/events.model");
const { logger } = require("../middlewares/logger.middleware");

class EventRepository {
  async createEvent({
    name,
    description,
    location,
    startDate,
    endDate,
    image,
  }) {
    try {
      if (
        !name ||
        !description ||
        !location ||
        !startDate ||
        !endDate ||
        !image
      ) {
        throw new Error("Todos los campos son requeridos.");
      }

      const newEvent = new eventModel({
        name,
        description,
        location,
        startDate,
        endDate,
        image,
      });

      await newEvent.save();
      return {
        success: true,
        message: "Evento creado con éxito",
        data: newEvent,
      };
    } catch (error) {
      logger.error("Error en createEvent:", error.message);
      throw new Error(error.message);
    }
  }

  async getEvents() {
    try {
      const events = await eventModel.find({}).lean();
      if (events.length === 0) {
        logger.info("No se encontraron eventos");
      }
      return events;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getEventById(id) {
    try {
      const event = await eventModel.findById(id).lean();
      if (!event) {
        throw new Error("Evento no encontrada");
      }
      return event;
    } catch (error) {
      logger.error("Error al obtener el evento:", error.message);
      throw new Error(error.message);
    }
  }

  async deleteEvent(id) {
    try {
      const event = await eventModel.findByIdAndDelete(id);
      if (!event) {
        throw new Error("Evento no encontrado");
      }
      return event;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new EventRepository();
