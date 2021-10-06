const { Schema, model } = require("mongoose");

const testCaseSchema = new Schema({
  question: { type: Schema.ObjectId, ref: "challenge", required: true },
  input: String,
  output: String,
  isHidden: Boolean,
});

module.exports = model("testcase", testCaseSchema);
