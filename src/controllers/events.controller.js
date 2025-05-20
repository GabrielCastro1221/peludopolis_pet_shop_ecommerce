const EventRepository = require("../repositories/events.repository");

class EventController {
  async createEvent(req, res) {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Imagen requerida." });
      }
      const image = req.file.path;
      const newEventData = { ...req.body, image };
      const eventCreated = await EventRepository.createEvent(newEventData);

      return res.status(201).json({
        success: true,
        message: eventCreated.message,
        data: eventCreated.data,
      });
    } catch (error) {
      console.error("Error en createEvent:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error al crear evento." });
    }
  }

  async getEvents(req, res) {
    try {
      const events = await EventRepository.getEvents();

      if (!events || events.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No se encontraron eventos." });
      }

      return res.status(200).json({
        success: true,
        message: "Eventos obtenidos exitosamente",
        data: events,
      });
    } catch (error) {
      console.error("Error en getEvents:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  }

  async getEventById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "El ID del evento es requerido.",
        });
      }

      const event = await EventRepository.getEventById(id);

      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: "Evento no encontrada." });
      }

      return res.status(200).json({
        success: true,
        message: "Evento obtenido exitosamente",
        data: event,
      });
    } catch (error) {
      console.error("Error en getEventById:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  }

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "El ID del evento es requerido.",
        });
      }

      const event = await EventRepository.deleteEvent(id);

      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: "Evento no encontrado." });
      }

      return res.status(200).json({
        success: true,
        message: "Evento eliminado exitosamente",
        data: event,
      });
    } catch (error) {
      console.error("Error en deleteEvent:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  }
}

module.exports = EventController;
