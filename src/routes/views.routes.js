const { Router } = require("express");
const ViewsController = require("../controllers/views.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const views = new ViewsController();
const auth = new AuthMiddleware();

router.get("/page-not-found", views.renderPageNotFound);
router.get("/acceso-denegado", views.renderAccessDenied);
router.get("/login", views.renderLogin);
router.get("/reset-password", views.renderResetPass);
router.get("/change-password", views.renderChangePass);
router.get("/confirm", views.renderEmailConfirm);
router.get("/", views.renderHome);
router.get("/tienda", views.renderStore);
router.get("/tienda/:id", views.renderProductDetail);
router.get("/terminos-y-condiciones", views.renderTerms);

router.get(
  "/perfil-usuario",
  auth.authenticate,
  auth.restrict(["usuario"]),
  views.renderProfileUser
);
router.get(
  "/perfil-admin",
  auth.authenticate,
  auth.restrict(["admin"]),
  views.renderProfileAdmin
);
router.get(
  "/cart/:id",
  auth.authenticate,
  auth.restrict(["usuario"]),
  views.renderCart
);
router.get(
  "/checkout/:id",
  auth.authenticate,
  auth.restrict(["usuario"]),
  views.renderBilling
);
router.get(
  "/epayco",
  auth.authenticate,
  auth.restrict(["usuario"]),
  views.getEpaycoData
);


module.exports = router;
