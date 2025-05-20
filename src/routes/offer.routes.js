const { Router } = require("express");
const OfferController = require("../controllers/offer.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const offer = new OfferController();
const auth = new AuthMiddleware();

router.post(
  "/create",
  auth.authenticate,
  auth.restrict(["admin"]),
  offer.createOffer
);
router.get("/", auth.authenticate, auth.restrict(["admin"]), offer.getOffers);
router.get("/:id", offer.getOfferById);
router.delete(
  "/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  offer.deleteOffer
);

module.exports = router;
