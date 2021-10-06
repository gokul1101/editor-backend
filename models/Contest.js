const { Schema, model } = require("mongoose");

const contestSchema = new Schema({
  contestCode: {
    type: Number,
    unique: true,
  },
  name: { type: String, unique: true },
  mcqs: [{ type: Schema.ObjectId, ref: "quiz", unique: true }],
  challenges: [{ type: Schema.ObjectId, ref: "challenge", unique: true }],
  maxScore : Number,
  createdBy: { type: Schema.ObjectId, ref: "admin", unique: true },
  startsAt: { type: Date, default: Date.now() },
  endsAt: { type: Date },
});

module.exports = model("contest", contestSchema);
