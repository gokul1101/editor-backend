const { Schema, model } = require("mongoose");

const challengeDifficultySchema = new Schema({
  difficulty_level: {
    type: String,
    enum: ["easy", "medium", "hard", "advanced", "expert"],
    required: true,
  },
});

module.exports = model("challengeDifficulty", challengeDifficultySchema);
