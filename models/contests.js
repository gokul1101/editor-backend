const { Schema, model } = require("mongoose");

const contestSchema = new Schema({
  contest_code: { type: String, required: true },
  contest_name: { type: String, required: true, unique: true },
  starts_at: { type: Date },
  ends_at: { type: Date },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("contest", contestSchema);
