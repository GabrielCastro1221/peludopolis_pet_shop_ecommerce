const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");

const router = Router();
const auth = new AuthController();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/requestPasswordReset", auth.RequestPasswordReset);
router.post("/reset-password", auth.resetPassword);

module.exports = router;
