const viewsRouter = require("../routes/views.routes");
const authRouter = require("../routes/auth.routes");
const userRouter = require("../routes/user.routes");
const productRouter = require("../routes/product.routes");
const uploadRouter = require("../routes/upload.routes");
const cartRouter = require("../routes/cart.routes");
const wishRouter = require("../routes/wishlist.routes");
const swaggerUiExpress = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { swaggerOptions } = require("../middlewares/swagger.middleware");

const specs = swaggerJSDoc(swaggerOptions);

const setupRoutes = (app) => {
  app.use("/", viewsRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1", uploadRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/wishlist", wishRouter);
  app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};

module.exports = setupRoutes;
