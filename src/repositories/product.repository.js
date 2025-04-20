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

  async getProducts() {
    try {
      const products = await productModel.find({});
      if (products.length === 0) {
        logger.warning("No se encontraron productos");
      }
      return products;
    } catch (error) {
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
