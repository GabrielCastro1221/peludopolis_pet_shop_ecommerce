const productModel = require("../models/product.model");
const { logger } = require("../middlewares/logger.middleware");
const { v4: uuidv4 } = require("uuid");

class ProductRepository {
  async createProduct({
    name,
    price,
    description,
    stock,
    product_options = [],
    product_options_2 = [],
    specification_list = [],
    tags = [],
    category,
    image,
    thumbnails = [],
    brand,
  }) {
    try {
      if (
        !name ||
        !price ||
        !description ||
        !image ||
        thumbnails.length === 0 ||
        !stock ||
        !category ||
        !brand
      ) {
        throw new Error("Todos los campos son requeridos");
      }
      const parsedProductOptions = Array.isArray(product_options)
        ? product_options.map((option) => ({
            key: option.key,
            value: option.value,
          }))
        : [];

      const parsedProductOptions2 = Array.isArray(product_options_2)
        ? product_options_2.map((option) => ({
            key: option.key,
            value: option.value,
          }))
        : [];

      const parsedSpecificationList = Array.isArray(specification_list)
        ? specification_list.map((spec) => ({
            specification: spec.specification,
          }))
        : [];

      const parsedTags = Array.isArray(tags)
        ? tags.map((tag) => ({
            tag: tag.tag,
          }))
        : [];

      const newProduct = new productModel({
        name,
        price,
        description,
        image,
        thumbnail: thumbnails,
        product_options: parsedProductOptions,
        product_options_2: parsedProductOptions2,
        specification_list: parsedSpecificationList,
        tags: parsedTags,
        code: uuidv4(),
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
