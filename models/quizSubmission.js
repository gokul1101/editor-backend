const { Schema, model } = require("mongoose");

const quizSubmissionSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "quiz", required: true },
  student: { type: Schema.Types.ObjectId, ref: "student", required: true },
  sumbittedAt: { type: Date, default: Date.now() },
  score : { type: Number, default: 0 }
});

module.exports = model("quizSubmission", quizSubmissionSchema);
