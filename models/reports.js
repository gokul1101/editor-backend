const { Schema, model } = require("mongoose");

const streamSchema = new Schema({
  generated_by: { type: Schema.Types.ObjectId, ref: "user" },
  created_at: { type: Date, default: Date.now() },
});

module.exports = model("stream", streamSchema);
