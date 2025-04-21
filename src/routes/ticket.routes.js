const { Router } = require('express');
const TicketController = require('../controllers/ticket.controller');

const ticket = new TicketController();
const router = Router();

router.post("/cart/:cid/finish-purchase", ticket.finishPurchase);

module.exports = router;