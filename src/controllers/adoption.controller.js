const AdoptionRepository = require("../repositories/adoptions.repository");
const adoptionR = new AdoptionRepository();

class AdoptionController {
  async createAdoptionRequest(req, res) {
    try {
      const adopter_photo = req.files?.adopter_photo?.[0]?.path || null;

      let members_family = [];
      try {
        members_family = JSON.parse(req.body.members_family || "[]");

        if (!Array.isArray(members_family)) {
          return res
            .status(400)
            .json({ message: "Miembros de familia debe ser un array" });
        }

        for (const member of members_family) {
          const requiredFields = [
            "name",
            "lastname",
            "age",
            "gender",
            "relationship",
            "phone",
            "email",
          ];
          const missing = requiredFields.filter((f) => !member[f]);
          if (missing.length) {
            return res.status(400).json({
              message: `Faltan campos en un miembro de la familia: ${missing.join(
                ", "
              )}`,
            });
          }
        }
      } catch {
        return res
          .status(400)
          .json({ message: "Formato de miembros de familia inválido" });
      }

      const adoptionData = {
        ...req.body,
        adopter_photo,
        members_family,
      };

      const result = await adoptionR.createAdoptionRequest(adoptionData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAdoptionsRequests(req, res) {
    try {
      const { page = 1, limit = 6 } = req.query;
      const requests = await adoptionR.getAdoptionRequests(page, limit);
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAdoptionRequestById(req, res) {
    try {
      const { id } = req.params;
      const result = await adoptionR.getAdoptionRequestById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateAdoptionRequest(req, res) {
    try {
      const { id } = req.params;
      const updated = await adoptionR.updateAdoptionRequest(id, req.body);
      res
        .status(200)
        .json({ message: "Solicitud actualizada con éxito", updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteAdoptionRequest(req, res) {
    try {
      const { id } = req.params;
      const result = await adoptionR.deleteAdoptionRequest(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AdoptionController;
