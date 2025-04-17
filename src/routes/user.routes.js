const { Router } = require("express");
const userController = require("../controllers/user.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const user = new userController();
const auth = new AuthMiddleware();

router.put(
  "/:id",
  auth.authenticate,
  auth.restrict(["usuario", "admin"]),
  user.updateUser
);
router.post("/create", user.createUser);
router.delete("/:id", user.deleteUser);
router.put("/admin/:id", user.changeRolAdmin);
router.put("/user/:id", user.changeRolUser);
router.get(
  "/profile/me",
  auth.authenticate,
  auth.restrict(["usuario", "admin"]),
  user.getUserProfile
);

module.exports = router;
