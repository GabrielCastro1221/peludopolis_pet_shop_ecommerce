const mongoose = require("mongoose");
const configObject = require("./env.config");
const { logger } = require("../middlewares/logger.middleware");

class Database {
  static #instance;
  constructor() {
    this.connectWithRetry();
  }

  async connectWithRetry() {
    try {
      await mongoose.connect(configObject.server.mongo_url, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      logger.info("Base de datos - conexion con MongoDB Exitosa!");
    } catch (error) {
      logger.error(`Pet Shop - Error al conectarse a la base de datos: ${error.message}`);
      setTimeout(this.connectWithRetry, 5000);
    }
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new Database();
    }
    return this.#instance;
  }
}

module.exports = Database.getInstance();
