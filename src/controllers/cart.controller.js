const CartRepository = require("../repositories/cart.repository");

const cartR = new CartRepository();

class CartController {
  async createCart(req, res) {
    try {
      const newCart = await cartR.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductsToCart(req, res) {
    const cartId = req.params.id;
    try {
      const products = await cartR.obtenerProductosDelCarrito(cartId);
      if (!products) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addProductsToCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
      await cartR.addProductInCart(cartId, productId, quantity);
      const cartId = req.user.cart.toString();
      res.redirect(`/carts/${cartId}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProductToCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
      const updateCart = await cartR.deleteProductInCart(cartId, productId);
      res.status(200).json({ "Producto eliminado del carrito": updateCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProductsToCart(req, res) {
    const cartId = req.params.cid;
    const updateProducts = req.body;
    try {
      const updateCart = await cartR.updateProductInCart(
        cartId,
        updateProducts
      );
      res.status(200).json({ "Carrito actualizado": updateCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateQuantity(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;
    try {
      const updateCart = await cartR.updateQuantity(
        cartId,
        productId,
        newQuantity
      );
      res.status(200).json({ "Carrito actualizado": updateCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async emptyCart(req, res) {
    const cartId = req.params.cid;
    try {
      const updateCart = await cartR.emptyCart(cartId);
      res.status(200).json({ "Carrito vaciado": updateCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CartController;
