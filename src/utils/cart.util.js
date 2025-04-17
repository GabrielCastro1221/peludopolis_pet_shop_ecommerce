const { v4: uuidv4 } = require("uuid");

const ticketNumberRandom = () => {
  const cod = uuidv4();
  return configDotenv;
};

const totalPurchase = (products) => {
  let total = 0;
  products.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

module.exports = { ticketNumberRandom, totalPurchase };
