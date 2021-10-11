const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  role_name: { type: String, enum: ["student", "admin"], required: true },
});

module.exports = model("role", roleSchema);
