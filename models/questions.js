const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  descrption: { type: String, required: true },
  statement: { type: String, required: true },
  input_format: { type: String },
  output_format: { type: String },
  contraints: { type: String },
  difficulty: { type: Schema.Types.ObjectId, ref: "difficulties" },
  max_score: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("question", questionSchema);
