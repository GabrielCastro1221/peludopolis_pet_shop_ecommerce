const offerModel = require("../models/offer.model");
const { logger } = require("../middlewares/logger.middleware");

class OfferRepository {
  async createOffer({
    offerPrice,
    description,
    originalPrice,
    countdown_start,
    countdown_end,
  }) {
    try {
      if (
        !offerPrice ||
        !description ||
        !originalPrice ||
        !countdown_start ||
        !countdown_end
      ) {
        throw new Error("Todos los campos son requeridos");
      }

      const newOffer = new offerModel({
        offerPrice,
        description,
        originalPrice,
        countdown_start,
        countdown_end,
      });
      await newOffer.save();
      return { message: "Oferta creada con éxito", offer: newOffer };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOffers() {
    try {
      const offers = await offerModel.find({}).lean();
      if (offers.length === 0) {
        logger.info("No se encontraron ofertas");
      }
      return offers;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOfferById(id) {
    try {
      const offer = await offerModel.findById(id).lean();
      if (!offer) {
        throw new Error("Oferta no encontrada");
      }
      return offer;
    } catch (error) {
      logger.error("Error al obtener la oferta:", error.message);
      throw new Error(error.message);
    }
  }

  async deleteOffer(id) {
    try {
      const offer = await offerModel.findByIdAndDelete(id);
      if (!offer) {
        throw new Error("Oferta no encontrada");
      }
      return offer;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new OfferRepository();
