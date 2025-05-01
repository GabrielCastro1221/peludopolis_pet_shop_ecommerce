const { Router } = require("express");
const TicketController = require("../controllers/ticket.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const auth = new AuthMiddleware();
const ticket = new TicketController();
const router = Router();

router.post(
  "/cart/:cid/finish-purchase",
  auth.authenticate,
  auth.restrict(["usuario"]),
  ticket.finishPurchase
);
router.delete(
  "/:id",
  auth.authenticate,
  auth.restrict(["admin", "usuario"]),
  ticket.deleteTicket
);
router.put(
  "/pay/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  ticket.payTicket
);
router.put(
  "/cancel/:id",
  auth.authenticate,
  auth.restrict(["admin", "usuario"]),
  ticket.cancelTicket
);
router.put(
  "/process/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  ticket.processTicket
);

module.exports = router;
