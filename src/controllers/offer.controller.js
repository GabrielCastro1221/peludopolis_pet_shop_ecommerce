const OfferRepository = require("../repositories/offer.repository");

class OfferController {
  async createOffer(req, res) {
    try {
      const {
        offerPrice,
        description,
        originalPrice,
        countdown_start,
        countdown_end,
      } = req.body;
      if (
        !offerPrice ||
        !description ||
        !originalPrice ||
        !countdown_start ||
        !countdown_end
      ) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos.",
        });
      }
      const offer = await OfferRepository.createOffer({
        offerPrice,
        description,
        originalPrice,
        countdown_start,
        countdown_end,
      });

      return res
        .status(201)
        .json({ success: true, message: offer.message, data: offer.offer });
    } catch (error) {
      console.error("Error en OfferController:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  }

  async getOffers(req, res) {
    try {
      const offers = await OfferRepository.getOffers();

      if (!offers || offers.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No se encontraron ofertas." });
      }

      return res.status(200).json({
        success: true,
        message: "Ofertas obtenidas exitosamente",
        data: offers,
      });
    } catch (error) {
      console.error("Error en getOffers:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  }

  async getOfferById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "El ID de la oferta es requerido.",
        });
      }

      const offer = await OfferRepository.getOfferById(id);

      if (!offer) {
        return res
          .status(404)
          .json({ success: false, message: "Oferta no encontrada." });
      }

      return res.status(200).json({
        success: true,
        message: "Oferta obtenida exitosamente",
        data: offer,
      });
    } catch (error) {
      console.error("Error en getOfferById:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  }

  async deleteOffer(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({
            success: false,
            message: "El ID de la oferta es requerido.",
          });
      }

      const offer = await OfferRepository.deleteOffer(id);

      if (!offer) {
        return res
          .status(404)
          .json({ success: false, message: "Oferta no encontrada." });
      }

      return res
        .status(200)
        .json({
          success: true,
          message: "Oferta eliminada exitosamente",
          data: offer,
        });
    } catch (error) {
      console.error("Error en deleteOffer:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  }
}

module.exports = OfferController;
