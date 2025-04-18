const productModel = require("../models/product.model");
const ProductRepository = require("../repositories/product.repository");

const productR = new ProductRepository();

class ProductController {
  async createProd(req, res) {
    try {
      const image = req.files?.image?.[0]?.path || null;

      const thumbnails = req.files?.thumbnail
        ? req.files.thumbnail.map((file) => ({
            url: file.path,
            public_id: file.filename,
          }))
        : [];

      const newProd = {
        ...req.body,
        image,
        thumbnails,
      };

      await productR.createProduct(newProd);
      res.redirect("/perfil-admin");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error al crear producto");
    }
  }

  updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
      let photoUrl = req.body.photo;
      if (req.file) {
        photoUrl = req.file.path;
      }

      let thumbnails = req.body.thumbnail || [];
      if (req.files?.thumbnail) {
        thumbnails = req.files.thumbnail.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }));
      }

      const updateData = {
        ...req.body,
        photo: photoUrl,
        thumbnail: thumbnails,
      };

      const prod = await productModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!prod)
        return res.status(404).json({ message: "Producto no encontrado" });
      res.status(200).json({ message: "Producto actualizado", producto: prod });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async deleteProduct(req, res) {
    const pid = req.params.id;
    try {
      let prod = await productR.deleteProduct(pid);
      res.status(200).json(prod);
    } catch (error) {
      res.status(500).send("Error al eliminar el producto");
    }
  }

  async featuredProduct(req, res) {
    const pid = req.params.id;
    try {
      let featured = await productR.featureProduct(pid);
      if (!featured) {
        return res.status(404).send("Producto no encontrado");
      }
      res.status(200).json(featured);
    } catch (error) {
      res.status(500).send(error.message || "Error al destacar el producto");
    }
  }

  async newArrive(req, res) {
    const pid = req.params.id;
    try {
      let newArrive = await productR.newArrive(pid);
      if (!newArrive) {
        return res.status(404).send("Producto no encontrado");
      }
      res.status(200).json(newArrive);
    } catch (error) {
      res.status(500).send(error.message || "Error al cambiar a nuevo arribo");
    }
  }

  async bestSeller(req, res) {
    const pid = req.params.id;
    try {
      let bestSeller = await productR.bestSeller(pid);
      if (!bestSeller) {
        return res.status(404).send("Producto no encontrado");
      }
      res.status(200).json(bestSeller);
    } catch (error) {
      res.status(500).send(error.message || "Error al cambiar a mas vendido");
    }
  }
}

module.exports = ProductController;
