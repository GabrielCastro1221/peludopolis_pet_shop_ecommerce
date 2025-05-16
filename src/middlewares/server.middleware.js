const { logger } = require("../middlewares/logger.middleware");
const configObject = require("../config/env.config");
require("../config/connection.config");
const { Server } = require("socket.io");

const socketModules = [
  require("../services/web_socket/socketProduct.service"),
  require("../services/web_socket/socketTicket.service"),
  require("../services/web_socket/socketUser.service"),
  require("../services/web_socket/socketCart.service"),
];

const serverListenMiddleware = (app) => {
  const port = configObject.server.port;
  const httpServer = app.listen(port, () => {
    logger.info(`Servidor escuchando en el puerto ${port}`);
    logger.info(`Peludopolis ejecutándose en la URL http://localhost:${port}`);
  });

  const io = new Server(httpServer);
  socketModules.forEach((SocketClass) => new SocketClass(io));
};

module.exports = serverListenMiddleware;
