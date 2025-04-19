const { Router } = require("express");
const CartController = require("../controllers/cart.controller");

const router = Router();
const cart = new CartController();

router.post("/:cid/products/:pid", cart.addProductsToCart);
router.delete("/:cid/products/:pid", cart.deleteProductToCart);
router.delete("/:cid", cart.emptyCart);

module.exports = router;
