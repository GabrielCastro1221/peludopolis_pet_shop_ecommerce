const socket = require("socket.io");
const CartRepository = require("../../repositories/cart.repository");
const { logger } = require("../../middlewares/logger.middleware");

const cartRepository = new CartRepository();

class SocketCart {
  constructor(io) {
    this.io = io; 
    this.initSocketEvents();
  }

  initSocketEvents() {
    this.io.on("connection", async (socket) => {
      logger.info("WebSocket carritos de compra conectado");

      socket.on("addProductInCart", async ({ cartId, productId, quantity }) => {
        try {
          const updatedCart = await cartRepository.addProductInCart(cartId, productId, quantity);
          socket.emit("cartUpdated", updatedCart);
        } catch (error) {
          socket.emit("error", "Error al agregar producto al carrito");
        }
      });

      // Obtener productos del carrito
      socket.on("getCartProducts", async (cartId) => {
        try {
          const cart = await cartRepository.obtenerProductosDeCarrito(cartId);
          socket.emit("cartProducts", cart);
        } catch (error) {
          socket.emit("error", "Error al obtener productos del carrito");
        }
      });

      // Eliminar producto del carrito
      socket.on("deleteProductInCart", async ({ cartId, productId }) => {
        try {
          const updatedCart = await cartRepository.deleteProductInCart(cartId, productId);
          socket.emit("cartUpdated", updatedCart);
        } catch (error) {
          socket.emit("error", "Error al eliminar producto del carrito");
        }
      });

      // Vaciar carrito
      socket.on("emptyCart", async (cartId) => {
        try {
          const updatedCart = await cartRepository.emptyCart(cartId);
          socket.emit("cartEmptied", updatedCart);
        } catch (error) {
          socket.emit("error", "Error al vaciar el carrito");
        }
      });

      // Obtener carrito por ID
      socket.on("getCartById", async (cartId) => {
        try {
          const cart = await cartRepository.getCartById(cartId);
          socket.emit("cartDetail", cart);
        } catch (error) {
          socket.emit("error", "Error al obtener el carrito de compras");
        }
      });
    });
  }
}

module.exports = SocketCart;
