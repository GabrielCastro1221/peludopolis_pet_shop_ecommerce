const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion API Ecommerce",
      description: "Plataforma dedicada a la venta de productos para mascotas",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

module.exports = { swaggerOptions };
