const { Schema, model } = require("mongoose");

const collegeSchema = new Schema({
  college_name: { type: String, required: true },
});

module.exports = model("college", collegeSchema);
