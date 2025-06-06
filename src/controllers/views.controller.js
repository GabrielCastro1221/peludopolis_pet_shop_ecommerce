const ProductRepository = require("../repositories/product.repository");
const TicketRepository = require("../repositories/ticket.repository");
const UserRepository = require("../repositories/user.repository");
const CartRepository = require("../repositories/cart.repository");
const EventRepository = require("../repositories/events.repository");
const OfferRepository = require("../repositories/offer.repository");
const configObject = require("../config/env.config");

const productR = new ProductRepository();
const ticketR = new TicketRepository();
const userR = new UserRepository();
const cartR = new CartRepository();

class ViewsManager {
  renderPageNotFound = (req, res) => {
    try {
      res.render("pageNotFound");
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderAccessDenied = (req, res) => {
    try {
      res.render("accessDenied");
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderHome = async (req, res) => {
    try {
      const featured = await productR.getFeaturedProducts();
      const newArrive = await productR.getNewArrive();
      const seller = await productR.getMoreSeller();
      const offer = await OfferRepository.getOffers();
      const event = await EventRepository.getEvents();
      res.render("home", { featured, newArrive, seller, offer, event });
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderLogin = (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderResetPass = (req, res) => {
    try {
      res.render("resetPass");
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderChangePass = (req, res) => {
    try {
      res.render("changePass");
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderEmailConfirm = (req, res) => {
    try {
      res.render("emailConfirm");
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderProfileUser = (req, res) => {
    try {
      res.render("profileUser");
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderProfileAdmin = async (req, res) => {
    try {
      const { page, limit = 100, sort, query } = req.query;
      const users = await userR.getAllUsers();
      const { productos, categorias, pagination } =
        await productR.getPaginatedProducts({
          page,
          limit,
          sort,
          query,
        });
      const tickets = await ticketR.getTickets();
      res.render("profileAdmin", {
        users,
        products: productos,
        categorias,
        pagination,
        tickets,
      });
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderStore = async (req, res) => {
    try {
      const { page = 1, limit = 6, sort = "asc", query = null } = req.query;
      const { productos, categorias, pagination } =
        await productR.getPaginatedProducts({
          page,
          limit,
          sort,
          query,
        });
      if (productos.length === 0) {
        return res.render("store", {
          productos: [],
          categorias,
          error: "No hay productos disponibles en la tienda",
          ...pagination,
        });
      }
      res.render("store", {
        productos: productos.map((producto) => ({
          id: producto._id,
          type_product: producto.type_product,
          ...producto,
        })),
        categorias,
        ...pagination,
      });
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  renderProductDetail = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productR.getProductById(productId);
      if (!product) {
        return res.redirect("/page-not-found");
      }
      res.render("productDetail", { product });
    } catch (error) {
      res.redirect("/page-not-found");
    }
  };

  async renderCart(req, res) {
    try {
      const cartId = req.params.id;
      const cart = await cartR.getCartById(cartId);
      if (!cart) {
        return res.redirect("/page-not-found");
      }
      res.render("cart", { cart });
    } catch (error) {
      res.redirect("/page-not-found");
    }
  }

  async renderBilling(req, res) {
    try {
      const ticketId = req.params.id;
      const ticket = await ticketR.getTicketById(ticketId);
      if (!ticket) {
        return res.redirect("/page-not-found");
      }
      res.render("billing", { ticket });
    } catch (error) {
      res.redirect("/page-not-found");
    }
  }

  async getEpaycoData(req, res) {
    try {
      const publicKey = configObject.epayco.epayco_public_key;
      const mode = configObject.epayco.epayco_mode;
      res.json({ publicKey, mode });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos de Epayco" });
    }
  }

  async renderTerms(req, res) {
    try {
      res.render("terms");
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al renderizar terminos y condiciones" });
    }
  }
}

module.exports = ViewsManager;
