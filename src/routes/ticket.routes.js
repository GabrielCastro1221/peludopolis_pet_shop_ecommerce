const { Router } = require("express");
const TicketController = require("../controllers/ticket.controller");

const ticket = new TicketController();
const router = Router();

router.post("/cart/:cid/finish-purchase", ticket.finishPurchase);
router.delete("/:id", ticket.deleteTicket);
router.put("/pay/:id", ticket.payTicket);
router.put("/cancel/:id", ticket.cancelTicket);
router.put("/process/:id", ticket.processTicket);

module.exports = router;
