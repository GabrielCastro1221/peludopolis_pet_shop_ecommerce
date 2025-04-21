const CartRepository = require("../repositories/cart.repository");
const TicketRepository = require("../repositories/ticket.repository");
const { ticketNumberRandom } = require("../utils/cart.util");

const cartR = new CartRepository();
const ticketR = new TicketRepository();

class TicketController {
  async finishPurchase(req, res) {
    const cartId = req.params.cid;
    const { amount, shipping, subtotal } = req.body;

    try {
      const cart = await cartR.obtenerProductosDeCarrito(cartId);
      const user = await ticketR.findUserByCartId(cartId);

      if (!cart || !user) {
        return res
          .status(404)
          .json({ error: "Carrito o usuario no encontrado" });
      }

      const ticketData = {
        code: ticketNumberRandom(),
        amount,
        shipping,
        subtotal,
        purchaser: user._id,
        cart: cartId,
        purchase_datetime: new Date(),
      };

      const ticket = await ticketR.createTicket(ticketData);
      await ticketR.addTicketToUser(user._id, ticket._id);

      res.status(201).json({ _id: ticket._id });
    } catch (error) {
      res.status(500).json({
        error: "Error al realizar la compra, intenta nuevamente",
      });
    }
  }
}

module.exports = TicketController;
