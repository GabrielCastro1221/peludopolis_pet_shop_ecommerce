const cartModel = require("../models/cart.model");
const { logger } = require("../middlewares/logger.middleware");
class CartRepository {
  async addProductInCart(cartId, productId, quantity = 1) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error al agregar producto al carrito: " + error.message);
    }
  }

    async obtenerProductosDeCarrito(idCarrito) {
      try {
        const cart = await cartModel.findById(idCarrito);
        if (!cart) {
          logger.warning("El carrito no existe");
          return null;
        }
        return cart;
      } catch (error) {
        throw new Error("Error al obtener los productos del carrito");
      }
    }

  async deleteProductInCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );
      await cart.save();
      return cart;
    } catch (error) {
      throw new error("Error al eliminar producto del carrito");
    }
  }

  async emptyCart(cartId) {
    try {
      const cart = await cartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      return cart;
    } catch (error) {
      throw new error("Error al vaciar carrito");
    }
  }
}

module.exports = CartRepository;
