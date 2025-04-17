const { Router } = require('express');
const upload = require("../middlewares/cloudinary.middleware");
const MulterController = require("../controllers/upload.controller");

const router = Router();
const multer = new MulterController();

router.post("/upload", upload.single("photo"), multer.uploadImage);

module.exports = router;