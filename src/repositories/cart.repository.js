const cartModel = require("../models/cart.model");
const { logger } = require("../middlewares/logger.middleware");

class CartRepository {
  async createCart() {
    try {
      const newCart = new cartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new error("Error al crear carrito de compras");
    }
  }

  async obtenerProductosDelCarrito(idCarrito) {
    try {
      const cart = await cartModel.findById(idCarrito);
      if (!cart) {
        throw new Error("Carrito no encontrado");
        return null;
      }
      return cart;
    } catch (error) {
      throw new error("Error al obtener productos del carrito");
    }
  }

  async addProductInCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.obtenerProductosDelCarrito(cartId);
      const productExist = cartModel.products.find(
        (item) => item.productId.toString() === productId
      );
      if (productExist) {
        productExist.quantity += quantity;
      } else {
        cartModel.products.push({ product: productId, quantity });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      throw new error("Error al agregar producto al carrito");
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

  async updateProductInCart(cartId, updateProducts) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = updateProducts;
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      throw new error("Error al actualizar productos del carrito");
    }
  }

  async updateQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const productIndex = cartModel.products.findIndex(
        (item) => item._id.toString() === productId
      );
      if (productIndex !== -1) {
        cartModel.products[productIndex].quantity = newQuantity;
        cart.markModified("products");
        await cart.save();
        return cart;
      }
    } catch (error) {
      throw new error("Error al actualizar cantidad del producto");
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
