const { Schema, model } = require("mongoose");

const contestSchema = new Schema({
  contestCode: {
    type: Number,
    unique: true,
  },
  name: { type: String, unique: true },
  mcqs: [{ type: Schema.Types.ObjectId, ref: "quiz", unique: true }],
  challenges: [{ type: Schema.Types.ObjectId, ref: "challenge", unique: true }],
  maxScore : Number,
  mcqSubmissions : [{ type: Schema.Types.ObjectId, ref: "mcqSubmission", unique: true }],
  challengeSubmissions : [{ type: Schema.Types.ObjectId, ref: "challengeSubmission", unique: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: "admin", unique: true },
  startsAt: { type: Date, default: Date.now() },
  endsAt: { type: Date },
});

module.exports = model("contest", contestSchema);
