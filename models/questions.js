const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  name: { type: String, unique: true },
  type_id: { type: Schema.Types.ObjectId, ref: "testTypes" },
  contest_id: { type: Schema.Types.ObjectId, ref: "contest" },
  quiz_id: { type: Schema.Types.ObjectId, ref: "quizzes" },
  statement: { type: String, required: true },
  descrption: { type: String },
  input_format: { type: String },
  output_format: { type: String },
  contraints: { type: String },
  difficulty_id: { type: Schema.Types.ObjectId, ref: "difficulties" },
  max_score: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("questions", questionSchema);
