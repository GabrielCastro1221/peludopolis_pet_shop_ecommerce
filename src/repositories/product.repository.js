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
      logger.error("Error en el repositorio:", error.message);
      throw new Error(error.message);
    }
  }

  async getProducts(limit = 100, page = 1, sort, query) {
    try {
      const skip = (page - 1) * limit;
      let queryOptions = {};
      if (query) {
        queryOptions = { category: query };
      }
      const sortOptions = {};
      if (sort) {
        if (sort === "asc" || sort === "desc") {
          sortOptions.price = sort === "asc" ? 1 : -1;
        }
      }
      const productos = await productModel
        .find(queryOptions)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
      const totalProducts = await productModel.countDocuments(queryOptions);
      const totalPages = Math.ceil(totalProducts / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      return {
        docs: productos,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/api/v1/products?limit=${limit}&page=${
              page - 1
            }&sort=${sort}&query=${query}`
          : null,
        nextLink: hasNextPage
          ? `/api/v1/products?limit=${limit}&page=${
              page + 1
            }&sort=${sort}&query=${query}`
          : null,
      };
    } catch (error) {
      throw new error("Error al obtener los productos");
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
    if (currentType && currentType !== "destacado") {
      throw new Error(
        `No se puede marcar como "destacado" porque ya está marcado como "${currentType}"`
      );
    }
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
    if (currentType && currentType !== "nuevo arribo") {
      throw new Error(
        `No se puede marcar como "nuevo arribo" porque ya está marcado como "${currentType}"`
      );
    }
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
    if (currentType && currentType !== "mas vendido") {
      throw new Error(
        `No se puede marcar como "más vendido" porque ya está marcado como "${currentType}"`
      );
    }
    const newType = currentType === "mas vendido" ? null : "mas vendido";
    const prod = await productModel.findByIdAndUpdate(
      id,
      { type_product: newType },
      { new: true }
    );
    return prod;
  }
}

module.exports = ProductRepository;
