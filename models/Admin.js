const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  contests: [{ type: Schema.ObjectId, ref: "contest", unique: true }],
});

module.exports = model("admin", adminSchema);
