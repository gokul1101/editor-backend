const { Schema, model } = require("mongoose");

const genderSchema = new Schema({
  gender_name: {
    type: String,
    enum: ["male", "female", "others"],
    required: true,
  },
});

module.exports = model("gender", genderSchema);
