const CartRepository = require("../repositories/cart.repository");
const ticketModel = require("../models/ticket.model");
const userModel = require("../models/user.model");
const { ticketNumberRandom } = require("../utils/cart.util");

const cartR = new CartRepository();

class TicketController {
  async finishPurchase(req, res) {
    const cartId = req.params.cid;
    const { amount, shipping, subtotal } = req.body;
    try {
      const cart = await cartR.obtenerProductosDeCarrito(cartId);
      const userWithCart = await userModel.findOne({ cart: cartId });

      if (!cart || !userWithCart) {
        return res
          .status(404)
          .json({ error: "Carrito o usuario no encontrado" });
      }

      const ticket = new ticketModel({
        code: ticketNumberRandom(),
        amount,
        shipping,
        subtotal,
        purchaser: userWithCart._id,
        cart: cartId,
        purchase_datetime: new Date(),
      });

      await ticket.save();

      userWithCart.tickets.push(ticket._id);
      await userWithCart.save();

      res.status(201).json({ _id: ticket._id });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al realizar la compra, intenta nuevamente" });
    }
  }
}

module.exports = TicketController;
