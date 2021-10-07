const { Schema, model } = require("mongoose");

const challengeSubmissionSchema = new Schema({
  challenge: { type: Schema.Types.ObjectId, ref: "challenge", required: true },
  student: { type: Schema.Types.ObjectId, ref: "student", required: true },
  sumbittedAt: { type: Date, default: Date.now() },
  score : { type: Number, default: 0 }
});

module.exports = model("challengeSubmission", challengeSubmissionSchema);
