const socket = require("socket.io");
const ProductRepository = require("../repositories/product.repository");

const product = new ProductRepository();

class SocketProduct {
  constructor(httpServer) {
    this.io = socket(httpServer);
    this.initSocketEvents();
  }

  initSocketEvents() {
    this.io.on("connection", async (socket) => {
      await this.emitPaginatedProducts(socket, {
        page: 1,
        limit: 6,
        sort: "asc",
        query: null,
      });

      socket.on("featureProd", async (id) => {
        await product.featureProduct(id);
        await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
      });

      socket.on("newArrive", async (id) => {
        await product.newArrive(id);
        await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
      });

      socket.on("bestSeller", async (id) => {
        await product.bestSeller(id);
        await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
      });

      socket.on("deleteProd", async (id) => {
        await product.deleteProduct(id);
        await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
      });

      socket.on("getPaginatedProducts", async (params) => {
        await this.emitPaginatedProducts(socket, params);
      });
    });
  }

  async emitPaginatedProducts(socket, queryParams) {
    try {
      const result = await product.getPaginatedProducts(queryParams);
      socket.emit("products", {
        productos: result.productos.map((producto) => ({
          id: producto._id,
          type_product: producto.type_product,
          ...producto,
        })),
        categorias: result.categorias,
        pagination: result.pagination,
      });
    } catch (error) {
      socket.emit("error", "Error al obtener productos paginados");
    }
  }
}

module.exports = SocketProduct;
