const { Schema, model } = require("mongoose");

const challengeCategorySchema = new Schema({
  category_name: String,
});

module.exports = model("challengeCategory", challengeCategorySchema);
