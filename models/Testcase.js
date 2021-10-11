const { Schema, model } = require("mongoose");

const testcaseSchema = new Schema({
  challenge: { type: Schema.Types.ObjectId, ref: "challenge_category" },
  input: String,
  output: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("testcase", testcaseSchema);
