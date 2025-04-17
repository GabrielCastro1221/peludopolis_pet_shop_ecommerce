const { Schema, model } = require("mongoose");

const schema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

schema.pre("findOne", function (next) {
  this.populate("products.product", "_id name price");
  next();
});

module.exports = model("Cart", schema);
