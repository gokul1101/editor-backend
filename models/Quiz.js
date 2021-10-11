const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  quiz_name: { type: String, required: true, unique: true },
  mcqs: [{ type: Schema.Types.ObjectId, ref: "mcq", unique: true }],
  max_score: { type: Number, default: 0 },
  quiz_submissions: [
    { type: Schema.Types.ObjectId, ref: "submission", unique: true },
  ],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("quiz", quizSchema);
