const socket = require("socket.io");
const ProductRepository = require("../repositories/product.repository");

const product = new ProductRepository();

class SocketProduct {
  constructor(httpServer) {
    this.io = socket(httpServer);
    this.initSocketEvents();
  }

  async initSocketEvents() {
    this.io.on("connection", async (socket) => {
      socket.emit("products", await product.getProducts());

      socket.on("featureProd", async (id) => {
        await product.featureProduct(id);
        this.emitUpdatedProducts(socket);
      });

      socket.on("newArrive", async (id) => {
        await product.newArrive(id);
        this.emitUpdatedProducts(socket);
      });

      socket.on("bestSeller", async (id) => {
        await product.bestSeller(id);
        this.emitUpdatedProducts(socket);
      });

      socket.on("deleteProd", async (id) => {
        await product.deleteProduct(id);
        this.emitUpdatedProducts(socket);
      });
    });
  }

  async emitUpdatedProducts(socket) {
    socket.emit("products", await product.getProducts());
  }
}

module.exports = SocketProduct;
