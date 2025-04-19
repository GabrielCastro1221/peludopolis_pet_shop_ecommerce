const wishlistModel = require("../models/wishList.model");

class WishlistRepository {
  async addProductInWishlist(wishId, productId) {
    try {
      const wish = await wishlistModel.findById(wishId);
      if (!wish) throw new Error("Lista de deseos no encontrada");
      const productExists = wish.products.some(
        (p) => p.product.toString() === productId.toString()
      );
      if (productExists) {
        throw new Error("El producto ya está en la lista de deseos");
      }
      wish.products.push({ product: productId });
      wish.markModified("products");
      await wish.save();
      return wish;
    } catch (error) {
      throw new Error(
        "Error al agregar producto a la lista de deseos: " + error.message
      );
    }
  }

  async deleteProductInWishlist(wishId, productId) {
    try {
      const wish = await wishlistModel.findById(wishId);
      if (!wish) {
        throw new Error("Lista de deseos no encontrada");
      }
      wish.products = wish.products.filter(
        (item) => item.product.toString() !== productId
      );
      await wish.save();
      return wish;
    } catch (error) {
      throw new error("Error al eliminar producto de la lista de deseos");
    }
  }

  async emptyWishlist(wishId) {
    try {
      const wish = await wishlistModel.findByIdAndUpdate(
        wishId,
        { products: [] },
        { new: true }
      );
      if (!wish) {
        throw new Error("Lista de deseos no encontrada");
      }
      return wish;
    } catch (error) {
      throw new error("Error al vaciar la lista de deseos");
    }
  }
}

module.exports = WishlistRepository;
