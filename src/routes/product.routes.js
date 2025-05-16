const { Router } = require("express");
const ProductController = require("../controllers/product.controller");
const upload = require("../middlewares/cloudinary.middleware");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const auth = new AuthMiddleware();
const router = Router();
const product = new ProductController();

router.get("/", product.getProducts);
router.get(
  "/search",
  auth.authenticate,
  auth.restrict(["usuario"]),
  product.searchProducts
);
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  auth.authenticate,
  auth.restrict(["admin"]),
  product.createProd
);
router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "thumbnail", maxCount: 5 },
  ]),
  auth.authenticate,
  auth.restrict(["admin"]),
  product.updateProduct
);
router.put(
  "/featured/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  product.featuredProduct
);
router.put(
  "/new-arrive/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  product.newArrive
);
router.put(
  "/best-seller/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  product.bestSeller
);
router.delete(
  "/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  product.deleteProduct
);

module.exports = router;
