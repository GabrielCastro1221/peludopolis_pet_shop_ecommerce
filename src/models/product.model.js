const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    thumbnail: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    product_options: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    product_options_2: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    specification_list: [
      {
        specification: { type: String, required: true },
      },
    ],
    tags: [
      {
        tag: { type: String, required: true },
      },
    ],
    type_product: {
      type: String,
      enum: ["destacado", "nuevo arribo", "oferta", "mas vendido"],
      default: null,
    },
    offer_percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true  },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.plugin(mongoosePaginate);

module.exports = model("Product", schema);
