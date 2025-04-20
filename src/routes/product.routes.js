const { Router } = require("express");
const ProductController = require("../controllers/product.controller");
const upload = require("../middlewares/cloudinary.middleware");

const router = Router();
const product = new ProductController();

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  product.createProd
);
router.get("/", product.getProducts);
router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  product.updateProduct
);
router.put("/featured/:id", product.featuredProduct);
router.put("/new-arrive/:id", product.newArrive);
router.put("/best-seller/:id", product.bestSeller);

router.delete("/:id", product.deleteProduct);

module.exports = router;
