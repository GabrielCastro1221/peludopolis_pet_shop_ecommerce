const wishListModel = require("../models/wishList.model");
const WishlistRepository = require("../repositories/wishlist.repository");

const wishlistR = new WishlistRepository();

class WishListController {
  async addProductsToWishlist(req, res) {
    const wishId = req.params.wid;
    const productId = req.params.pid;
    try {
      await wishlistR.addProductInWishlist(wishId, productId);
      res.redirect(`/lista-deseos/${wishId}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProductToWishlist(req, res) {
    const wishId = req.params.wid;
    const productId = req.params.pid;
    try {
      const updatewishlist = await wishlistR.deleteProductInWishlist(
        wishId,
        productId
      );
      res
        .status(200)
        .json({ "Producto eliminado de la lista de deseos": updatewishlist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async emptyWishlist(req, res) {
    const wishId = req.params.wid;
    try {
      const updateWishlist = await wishlistR.emptyWishlist(wishId);
      res.status(200).json({ "Lista d deseos vacia": updateWishlist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = WishListController;
