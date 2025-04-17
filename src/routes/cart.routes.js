const { Router } = require("express");
const CartController = require("../controllers/cart.controller");

const router = Router();
const cart = new CartController();

router.post("/", cart.createCart);
router.get("/:id", cart.getProductsToCart);
router.post("/:cid/products/:pid", cart.addProductsToCart);
router.delete("/:cid/products/:pid", cart.deleteProductToCart);
router.put("/:cid", cart.updateProductsToCart);
router.delete("/:cid", cart.emptyCart);
router.put("/:cid/products/:pid", cart.updateQuantity);

module.exports = router;
