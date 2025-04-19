const { Router } = require("express");
const WishListController = require("../controllers/wishlist.controller");

const router = Router();
const wish = new WishListController();

router.post("/:wid/products/:pid", wish.addProductsToWishlist);
router.delete("/:wid/products/:pid", wish.deleteProductToWishlist);
router.delete("/:wid", wish.emptyWishlist);

module.exports = router;
