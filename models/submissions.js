const { Schema, model } = require("mongoose");

const submissionSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: "question", default: null },
  user: { type: Schema.Types.ObjectId, ref: "user", unique: true },
  event_category: {
    type: String,
    enum: ["quiz", "challenge"],
    required: true,
  },
  score: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now() },
});

module.exports = model("submission", submissionSchema);
