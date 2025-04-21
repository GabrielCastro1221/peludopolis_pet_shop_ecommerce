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
      res.status(500).send("Error al crear producto");
    }
  }

  async getProducts(req, res) {
    try {
      const products = await productR.getProducts();
      if (products.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos" });
      }
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
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

      const updatedProduct = await productR.updateProduct(id, updateData);
      res
        .status(200)
        .json({ message: "Producto actualizado", producto: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

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
