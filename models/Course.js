const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  course_name: { type: String, required: true },
});

module.exports = model("course", courseSchema);
