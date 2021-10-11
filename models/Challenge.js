const { Schema, model } = require("mongoose");

const challengeSchema = new Schema({
  challenge_name: { type: String, required: true, unique: true },
  descrption: { type: String, required: true },
  statement: { type: String, required: true },
  input_format: { type: String, required: true },
  output_format: { type: String, required: true },
  contraints: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "challenge_category" },
  difficulty: { type: Schema.Types.ObjectId, ref: "challenge_difficulty" },
  testcases: [{ type: Schema.Types.ObjectId, ref: "testcase", unique: true }],
  max_score: { type: Number, default: 0 },
  submissions: [
    { type: Schema.Types.ObjectId, ref: "submission", unique: true },
  ],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("challenge", challengeSchema);
