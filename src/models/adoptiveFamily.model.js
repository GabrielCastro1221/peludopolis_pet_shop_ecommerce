const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
  },
  familyMembers: { type: Number },
  experienceWithPets: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = model("Adoptive_family", schema);
