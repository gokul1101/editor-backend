const { Schema, model } = require("mongoose");

const quizzesSchema = new Schema({
  name: { type: String, required: true },
  contest_id: { type: Schema.Types.ObjectId, ref: "contest" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("quizzes", quizzesSchema);
