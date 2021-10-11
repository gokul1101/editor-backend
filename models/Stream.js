const { Schema, model } = require("mongoose");

const streamSchema = new Schema({
  stream_name: { type: String, required: true },
});

module.exports = model("stream", streamSchema);
