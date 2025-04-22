const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },  
  gender: { type: String, enum: ["macho", "hembra"], required: true },
  description: { type: String, required: true },
  medicalHistory: { type: [String]},
  photo: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  thumbnail: [
    {
      url: { type: String,  },
      public_id: { type: String, },
    },
  ],
  adoptiveFamily: {
    type: Schema.Types.ObjectId,
    ref: "Adoption",
  },
});

schema.plugin(mongoosePaginate);

module.exports = model("Pets", schema);
