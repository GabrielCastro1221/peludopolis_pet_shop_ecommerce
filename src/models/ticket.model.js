const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    code: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    purchase_datetime: { type: Date, default: Date.now, required: true },
    status: {
      type: String,
      enum: ["pagado", "cancelado", "en proceso"],
      default: "en proceso",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Ticket", schema);
