const { Router } = require("express");
const CartController = require("../controllers/cart.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const auth = new AuthMiddleware();
const router = Router();
const cart = new CartController();

router.post(
  "/:cid/products/:pid",
  auth.authenticate,
  auth.restrict(["usuario"]),
  cart.addProductsToCart
);
router.delete(
  "/:cid/products/:pid",
  auth.authenticate,
  auth.restrict(["usuario"]),
  cart.deleteProductToCart
);
router.delete(
  "/:cid",
  auth.authenticate,
  auth.restrict(["usuario"]),
  cart.emptyCart
);

module.exports = router;
