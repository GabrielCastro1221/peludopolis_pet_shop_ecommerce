const PetsRepository = require("../repositories/pets.repository");
const petsR = new PetsRepository();

class AdoptionsController {
  async createPet(req, res) {
    try {
      const photo = req.files?.photo?.[0]?.path || null;

      const thumbnails = req.files?.thumbnail
        ? req.files.thumbnail.map((file) => ({
            url: file.path,
            public_id: file.filename,
          }))
        : [];

      const { owner } = req.body;
      if (!owner) {
        return res.status(400).send("El campo 'owner' es obligatorio");
      }

      const newPet = {
        ...req.body,
        photo,
        thumbnails,
        owner,
      };

      const result = await petsR.createPet(newPet);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPets(req, res) {
    try {
      const { page, limit, species, gender } = req.query;
      const pets = await petsR.getPets({ page, limit, species, gender });
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener mascotas" });
    }
  }

  async updatePet(req, res) {
    const { id } = req.params;
    try {
      let photoUrl = req.body.photo;
      if (req.file) {
        photoUrl = req.file.path;
      }

      let thumbnails = req.body.thumbnail || [];
      if (req.files?.thumbnail) {
        thumbnails = req.files.thumbnail.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }));
      }

      const updateData = {
        ...req.body,
        photo: photoUrl,
        thumbnail: thumbnails,
      };

      const updatedPet = await petsR.updatePet(id, updateData);
      res.status(200).json({ message: "Mascota actualizada", pet: updatedPet });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deletePet(req, res) {
    const pid = req.params.id;
    try {
      const pet = await petsR.deletePet(pid);
      res.status(200).json({ message: "Mascota eliminada", pet });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la mascota" });
    }
  }
}

module.exports = AdoptionsController;
