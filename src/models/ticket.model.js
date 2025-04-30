const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new Schema(
  {
    code: { type: String, unique: true, required: true },
    shipping: { type: String, required: true },
    subtotal: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    purchase_datetime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pagado", "cancelado", "en proceso"],
      default: "en proceso",
    },
  },
  { timestamps: true, versionKey: false }
);

schema.plugin(mongoosePaginate);

module.exports = model("Ticket", schema);
