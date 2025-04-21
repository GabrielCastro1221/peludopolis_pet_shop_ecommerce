const ticketModel = require("../models/ticket.model");
const userModel = require("../models/user.model");

class TicketRepository {
  async createTicket(data) {
    const ticket = new ticketModel(data);
    await ticket.save();
    return ticket;
  }

  async findUserByCartId(cartId) {
    return await userModel.findOne({ cart: cartId });
  }

  async addTicketToUser(userId, ticketId) {
    const user = await userModel.findById(userId);
    if (!user) return null;
    user.tickets.push(ticketId);
    await user.save();
    return user;
  }
}

module.exports = TicketRepository;
