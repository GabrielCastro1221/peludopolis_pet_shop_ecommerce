const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const ticketModel = require("../models/ticket.model");

class ViewsManager {
  renderPageNotFound = (req, res) => {
    try {
      res.render("pageNotFound");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderHome = async (req, res) => {
    try {
      const featured = await productModel
        .find({ type_product: "destacado" })
        .lean();

      const newArrive = await productModel
        .find({ type_product: "nuevo arribo" })
        .lean();

      const seller = await productModel
        .find({ type_product: "mas vendido" })
        .lean();

      const offer = await productModel.find({ type_product: "oferta" }).lean();

      res.render("home", { featured, newArrive, seller, offer });
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderLogin = (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderResetPass = (req, res) => {
    try {
      res.render("resetPass");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderChangePass = (req, res) => {
    try {
      res.render("changePass");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderEmailConfirm = (req, res) => {
    try {
      res.render("emailConfirm");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderProfileUser = (req, res) => {
    try {
      res.render("profileUser");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderProfileAdmin = async (req, res) => {
    try {
      const users = await userModel.find({}).lean();
      const products = await productModel.find({}).lean();
      const tickets = await ticketModel.find({}).lean();
      const carts = await cartModel
        .find({})
        .populate("products.product", "_id name price")
        .lean();
      let errorMessage = null;

      if (users.length === 0) {
        errorMessage = "No hay usuarios registrados en la plataforma.";
      }
      if (products.length === 0) {
        errorMessage = "No hay productos registrados en la plataforma.";
      }
      if (carts.length === 0) {
        errorMessage =
          "No hay carritos de compra registrados en la plataforma.";
      }
      if (tickets.length === 0) {
        errorMessage = "No se han generado tickets de compra en la plataforma.";
      }
      const cartsWithMessage = carts.map((cart) => {
        if (cart.products.length === 0) {
          return {
            ...cart,
            message: "El carrito no tiene productos agregados.",
          };
        }
        return cart;
      });
      res.render("profileAdmin", {
        users: users || [],
        products: products || [],
        carts: cartsWithMessage || [],
        tickets: tickets || [],
        message: errorMessage,
      });
    } catch (error) {
      res.render("pageNotFound", { error: error.message });
    }
  };

  renderStore = async (req, res) => {
    try {
      const { page = 1, limit = 6, sort = "asc", query = null } = req.query;
      const pageValue = parseInt(page, 10) || 1;
      const limitValue = parseInt(limit, 10) || 100;
      const sortOptions =
        sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};
      const queryOptions = query ? { category: query } : {};
      const products = await productModel
        .find(queryOptions)
        .sort(sortOptions)
        .skip((pageValue - 1) * limitValue)
        .limit(limitValue);
      const totalProducts = await productModel.countDocuments(queryOptions);
      const totalPages = Math.ceil(totalProducts / limitValue);
      const categorias = await productModel.distinct("category");

      if (products.length === 0) {
        return res.render("store", {
          productos: [],
          categorias,
          error: "No hay productos disponibles en la tienda",
          hasPrevPage: false,
          hasNextPage: false,
          currentPage: pageValue,
          totalPages: 0,
          limit: limitValue,
          sort,
          query,
        });
      }
      res.render("store", {
        productos: products.map((producto) => ({
          id: producto._id,
          type_product: producto.type_product,
          ...producto.toObject(),
        })),
        categorias,
        hasPrevPage: pageValue > 1,
        hasNextPage: pageValue < totalPages,
        prevPage: pageValue > 1 ? pageValue - 1 : null,
        nextPage: pageValue < totalPages ? pageValue + 1 : null,
        currentPage: pageValue,
        totalPages,
        limit: limitValue,
        sort,
        query,
      });
    } catch (error) {
      res.render("pageNotFound", { error: error.message });
    }
  };

  renderProductDetail = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await productModel.findById(id);
      if (!product) {
        res.render("pageNotFound");
      }
      res.render("productDetail", { product });
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderWitchList = async (req, res) => {
    try {
      res.render("wishList");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderCart = (req, res) => {
    try {
      res.render("cart");
    } catch (error) {
      res.render("pageNotFound");
    }
  };

  renderBilling = (req, res) => {
    try {
      res.render("billing");
    } catch (error) {
      res.render("pageNotFound");
    }
  };
}

module.exports = ViewsManager;
