const { Router } = require("express");
const ViewsController = require("../controllers/views.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const views = new ViewsController();
const auth = new AuthMiddleware();

router.get("/page-not-found", views.renderPageNotFound);
router.get("/", views.renderHome);
router.get("/login", views.renderLogin);
router.get("/reset-password", views.renderResetPass);
router.get("/change-password", views.renderChangePass);
router.get("/confirm", views.renderEmailConfirm);
router.get("/perfil-usuario", views.renderProfileUser);
router.get("/perfil-admin", views.renderProfileAdmin);
router.get("/tienda", views.renderStore);
router.get("/tienda/:id", views.renderProductDetail);
router.get("/lista-deseos", views.renderWitchList);
router.get("/cart/:id", views.renderCart);
router.get("/checkout", views.renderBilling);

module.exports = router;
