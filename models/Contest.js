const { Schema, model } = require("mongoose");

const contestSchema = new Schema({
  contest_code: { type: Number, required: true },
  contest_name: { type: String, required: true, unique: true },
  quizzes: [{ type: Schema.Types.ObjectId, ref: "quiz", unique: true }],
  challenges: [{ type: Schema.Types.ObjectId, ref: "challenge", unique: true }],
  max_score: { type: Number, default: 0 },
  starts_at: { type: Date },
  ends_at: { type: Date },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("contest", contestSchema);
