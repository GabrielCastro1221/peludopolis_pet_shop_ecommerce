const totalPurchase = (products) => {
  let total = 0;
  products.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

module.exports = { totalPurchase };
