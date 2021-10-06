const { Schema, model } = require("mongoose");

const challengeSchema = new Schema({
  name: String,
  description: String,
  statement: String,
  inputFormat: String,
  constraints: String,
  outputFormat: String,
  category: String,
  difficulty: String,
  testcases: [{ type: Schema.ObjectId, ref: "testcase", unique: true }],
  maxScore: { type: Number, max: 100, default: 0 },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = model("challenge", challengeSchema);
