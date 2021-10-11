const { Schema, model } = require("mongoose");

const mcqSchema = new Schema({
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  crt_answer: { type: Number, required: true },
});

module.exports = model("mcq", mcqSchema);
