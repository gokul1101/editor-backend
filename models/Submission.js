const { Schema, model } = require("mongoose");

const submissionSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "quiz", default: null },
  challenge: { type: Schema.Types.ObjectId, ref: "challenge", default: null },
  user: { type: Schema.Types.ObjectId, ref: "user", unique: true },
  event_category: {
    type: String,
    enum: ["quiz", "challenge"],
    required: true,
  },
  score: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

module.exports = model("submission", submissionSchema);
