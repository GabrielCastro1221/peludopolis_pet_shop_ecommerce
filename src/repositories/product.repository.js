const productModel = require("../models/product.model");
const { logger } = require("../middlewares/logger.middleware");
const { v4: uuidv4 } = require("uuid");

class ProductRepository {
  async createProduct({
    title,
    price,
    description,
    stock,
    type_product,
    category,
    image,
    thumbnails = [],
    brand,
  }) {
    try {
      if (!title || !price || !description || !stock || !category || !brand) {
        throw new Error("Todos los campos son requeridos");
      }

      const newProduct = new productModel({
        title,
        price,
        description,
        image,
        thumbnail: thumbnails,
        code: uuidv4(),
        type_product,
        stock,
        category,
        brand,
      });
      await newProduct.save();
      return { message: "Producto creado con éxito", product: newProduct };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPaginatedProducts({
    page = 1,
    limit = 6,
    sort = "asc",
    query = null,
  }) {
    try {
      const pageValue = parseInt(page, 10) || 1;
      const limitValue = parseInt(limit, 10) || 100;
      const sortOptions =
        sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};
      const queryOptions = query ? { category: query } : {};

      const products = await productModel
        .find(queryOptions)
        .sort(sortOptions)
        .skip((pageValue - 1) * limitValue)
        .limit(limitValue)
        .lean();

      const totalProducts = await productModel.countDocuments(queryOptions);
      const totalPages = Math.ceil(totalProducts / limitValue);
      const categorias = await productModel.distinct("category");

      return {
        productos: products,
        categorias,
        pagination: {
          hasPrevPage: pageValue > 1,
          hasNextPage: pageValue < totalPages,
          prevPage: pageValue > 1 ? pageValue - 1 : null,
          nextPage: pageValue < totalPages ? pageValue + 1 : null,
          currentPage: pageValue,
          totalPages,
          limit: limitValue,
          sort,
          query,
        },
      };
    } catch (error) {
      throw new Error("Error al paginar productos: " + error.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id).lean();
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      logger.error("Error al obtener producto:", error.message);
      throw new Error(error.message);
    }
  }

  async updateProduct(id, updateData) {
    try {
      const product = await productModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      logger.error("Error al actualizar producto:", error.message);
      throw new Error(error.message);
    }
  }

  async deleteProduct(id) {
    const deleteProd = await productModel.findByIdAndDelete(id);
    if (!deleteProd) {
      logger.warning("Producto no encontrado");
    }
    logger.info("Producto eliminado");
    return deleteProd;
  }

  async featureProduct(id) {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    const currentType = product.type_product;
    const newType = currentType === "destacado" ? null : "destacado";
    const prod = await productModel.findByIdAndUpdate(
      id,
      { type_product: newType },
      { new: true }
    );
    return prod;
  }

  async newArrive(id) {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    const currentType = product.type_product;
    const newType = currentType === "nuevo arribo" ? null : "nuevo arribo";
    const prod = await productModel.findByIdAndUpdate(
      id,
      { type_product: newType },
      { new: true }
    );
    return prod;
  }

  async bestSeller(id) {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    const currentType = product.type_product;
    const newType = currentType === "mas vendido" ? null : "mas vendido";
    const prod = await productModel.findByIdAndUpdate(
      id,
      { type_product: newType },
      { new: true }
    );
    return prod;
  }

  async getFeaturedProducts() {
    try {
      const featured = await productModel
        .find({ type_product: "destacado" })
        .lean();
      if (featured.length === 0) {
        logger.warning("No se encontraron productos destacados");
      }
      return featured;
    } catch (error) {
      logger.error("Error al obtener productos destacados:", error.message);
      throw new Error(error.message);
    }
  }

  async getNewArrive() {
    try {
      const newArrive = await productModel
        .find({ type_product: "nuevo arribo" })
        .lean();
      if (newArrive.length === 0) {
        logger.warning("No se encontraron nuevos arribos");
      }
      return newArrive;
    } catch (error) {
      logger.error("Error al obtener nuevos arribos:", error.message);
      throw new Error(error.message);
    }
  }

  async getMoreSeller() {
    try {
      const moreSeller = await productModel
        .find({ type_product: "mas vendido" })
        .lean();
      if (moreSeller.length === 0) {
        logger.warning("No se encontraron los productos mas vendidos");
      }
      return moreSeller;
    } catch (error) {
      logger.error(
        "Error al obtener los productos mas vendidos:",
        error.message
      );
      throw new Error(error.message);
    }
  }
}

module.exports = ProductRepository;
