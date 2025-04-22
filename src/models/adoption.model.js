const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const adoptionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pets", required: true },
    adopter_name: { type: String, required: true },
    adopter_lastname: { type: String, required: true },
    adopter_email: { type: String, required: true },
    adopter_phone: { type: String, required: true },
    adopter_address: { type: String, required: true },
    adopter_city: { type: String, required: true },
    adopter_ID: { type: String, required: true },
    adopter_photo: { type: String, required: true },
    observations: { type: String },
    members_family: [memberSchema],
  },
  { timestamps: true }
);

adoptionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Adoption", adoptionSchema);
