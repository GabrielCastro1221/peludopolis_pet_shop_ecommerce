const { Router } = require("express");
const EventController = require("../controllers/events.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");
const upload = require("../middlewares/cloudinary.middleware");

const router = Router();
const event = new EventController();
const auth = new AuthMiddleware();

router.post(
  "/create",
  auth.authenticate,
  auth.restrict(["admin"]),
  upload.single("image"),
  event.createEvent
);
router.get("/", auth.authenticate, auth.restrict(["admin"]), event.getEvents);
router.get("/:id", event.getEventById);
router.delete(
  "/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  event.deleteEvent
);

module.exports = router;
