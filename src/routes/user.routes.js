const { Router } = require("express");
const userController = require("../controllers/user.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const user = new userController();
const auth = new AuthMiddleware();

router.post("/create", user.createUser);
router.post("/newsletter/subscribe", user.subscribeToNewsletter);

router.put("/:id", user.updateUser);
router.put("/admin/:id", user.changeRolAdmin);
router.put("/user/:id", user.changeRolUser);

router.delete("/:id", user.deleteUser);

router.get(
  "/profile/me",
  auth.authenticate,
  auth.restrict(["usuario", "admin"]),
  user.getUserProfile
);

module.exports = router;
