const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  title: String,
  questions: [{ type: Schema.ObjectId, ref: "mcq", unique: true }],
  maxScore : Number
});

module.exports = model("quiz", quizSchema);
