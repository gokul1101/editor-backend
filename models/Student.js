const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  regno: {
    type: Number,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  password: String,
  gender: String,
  department: String,
  year: Number,
  points: Number,
});

module.exports = model("student", studentSchema);
