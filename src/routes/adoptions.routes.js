const { Router } = require("express");
const AdoptionsController = require("../controllers/adoptions.controller");
const upload = require("../middlewares/cloudinary.middleware");

const router = Router();
const adoption = new AdoptionsController();

router.post(
  "/create",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  adoption.createPet
);

router.get("/", adoption.getPets);

router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  adoption.updatePet
);

router.delete("/:id", adoption.deletePet);

module.exports = router;
