const { Router } = require("express");
const userController = require("../controllers/user.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const user = new userController();
const auth = new AuthMiddleware();

router.post(
  "/create",
  auth.authenticate,
  auth.restrict(["admin"]),
  user.createUser
);
router.post(
  "/newsletter/subscribe",
  auth.authenticate,
  auth.restrict(["usuario"]),
  user.subscribeToNewsletter
);
router.put(
  "/:id",
  auth.authenticate,
  auth.restrict(["usuario", "admin"]),
  user.updateUser
);
router.put(
  "/admin/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  user.changeRolAdmin
);
router.put(
  "/user/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  user.changeRolUser
);
router.delete(
  "/:id",
  auth.authenticate,
  auth.restrict(["usuario", "admin"]),
  user.deleteUser
);
router.get(
  "/profile/me",
  auth.authenticate,
  auth.restrict(["usuario"]),
  user.getUserProfile
);
router.get(
  "/orders",
  auth.authenticate,
  auth.restrict(["usuario"]),
  user.getUserOrders
);

module.exports = router;
