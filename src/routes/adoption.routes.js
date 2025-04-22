const { Router } = require("express");
const AdoptionController = require("../controllers/adoption.controller");
const upload = require("../middlewares/cloudinary.middleware");

const router = Router();
const adoption = new AdoptionController();

router.post(
  "/adoption-request",
  upload.fields([{ name: "adopter_photo", maxCount: 1 }]),
  adoption.createAdoptionRequest
);

router.get("/", adoption.getAdoptionsRequests);
router.get("/:id", adoption.getAdoptionRequestById);

router.put("/:id", adoption.updateAdoptionRequest);

router.delete("/:id", adoption.deleteAdoptionRequest);

module.exports = router;
