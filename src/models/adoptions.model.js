const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ["macho", "hembra"], required: true },
  description: { type: String },
  medicalHistory: { type: [String] },
  photo: { type: String },
  adoptiveFamily: {
    type: Schema.Types.ObjectId,
    ref: "AdoptiveFamily",
    required: true,
  },
  adoptionDetails: {
    adoptionDate: { type: Date, default: Date.now },
    comments: { type: String },
    status: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente",
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = model("Adoption", schema);
