const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  regno: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "role" },
  gender: { type: Schema.Types.ObjectId, ref: "gender" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  stream: { type: Schema.Types.ObjectId, ref: "stream" },
  course: { type: Schema.Types.ObjectId, ref: "course" },
  college: { type: Schema.Types.ObjectId, ref: "college" },
  phone_no: { type: Number },
  points: { type: Number, default: 0 },
  contests: [{ type: Schema.Types.ObjectId, ref: "contest", unique: true }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("user", userSchema);
