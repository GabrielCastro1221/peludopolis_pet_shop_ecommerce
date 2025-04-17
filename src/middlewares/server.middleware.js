const { logger } = require("../middlewares/logger.middleware");
const configObject = require("../config/env.config");
require("../config/connection.config");
const { Server } = require("socket.io");
const Socket = require("../services/socket.service");

const serverListenMiddleware = (app) => {
  const port = configObject.server.port;
  const httpServer = app.listen(port, () => {
    try {
      logger.info(`Servidor escuchando en el puerto ${port}`);
      logger.info(`Pet Shop ejecutandose en la url http://localhost:${port}`);
    } catch (error) {
      logger.error(`Error: ${error.message}`);
    }
  });
  new Socket(httpServer);
};

module.exports = serverListenMiddleware;
