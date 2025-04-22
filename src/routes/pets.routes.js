const { Router } = require("express");
const PetsController = require("../controllers/pets.controller");
const upload = require("../middlewares/cloudinary.middleware");

const router = Router();
const pet = new PetsController();

router.post(
  "/create",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  pet.createPet
);

router.get("/", pet.getPets);

router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  pet.updatePet
);

router.delete("/:id", pet.deletePet);

module.exports = router;
