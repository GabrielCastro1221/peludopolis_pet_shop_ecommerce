const CartRepository = require("../repositories/cart.repository");
const TicketRepository = require("../repositories/ticket.repository");
const { ticketNumberRandom } = require("../utils/cart.util");
const MailerController = require("../services/mailer.service");

const cartR = new CartRepository();
const ticketR = new TicketRepository();
const mailer = new MailerController();

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
      const productsData = cart.products.map((product) => ({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      }));
      const ticketData = {
        code: ticketNumberRandom(),
        amount,
        shipping,
        subtotal,
        purchaser: user._id,
        cart: cartId,
        purchase_datetime: new Date(),
        products: productsData,
      };
      const ticket = await ticketR.createTicket(ticketData);
      await ticketR.addTicketToUser(user._id, ticket._id);
      await cartR.emptyCart(cartId);
      await mailer.SendPurchaseConfirmation(user.email, ticketData);
      res.status(201).json({ _id: ticket._id });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: "Error al realizar la compra, intenta nuevamente" });
    }
  }

  async deleteTicket(req, res) {
    const { id } = req.params;
    try {
      const deleteTicket = await ticketR.deleteTicket(id);
      res
        .status(200)
        .json({ message: "Ticket eliminado", ticket: deleteTicket });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async payTicket(req, res) {
    const id = req.params.id;
    try {
      const updatedTicket = await ticketR.payTicket(id);
      res.status(200).json({
        message: "El estado del ticket se actualizó a pagado",
        ticket: updatedTicket,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Error al cambiar el estado del ticket",
      });
    }
  }

  async cancelTicket(req, res) {
    const id = req.params.id;
    try {
      const updatedTicket = await ticketR.payCancel(id);
      res.status(200).json({
        message: "El estado del ticket se actualizó a cancelado",
        ticket: updatedTicket,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Error al cambiar el estado del ticket",
      });
    }
  }

  async processTicket(req, res) {
    const id = req.params.id;
    try {
      const updatedTicket = await ticketR.payProcess(id);
      res.status(200).json({
        message: "El estado del ticket se actualizó a en proceso",
        ticket: updatedTicket,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Error al cambiar el estado del ticket",
      });
    }
  }
}

module.exports = TicketController;
