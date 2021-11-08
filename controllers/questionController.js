const Question = require("../models/questions");
const Answer = require("../models/answers");
const createQuestion = async (req, res) => {
  let questionDetails = req.body;
  if (questionDetails.type === "mcq") {
    let question = {
      quiz_id: questionDetails.quiz_id,
      statement: questionDetails.statement,
      max_score: 1,
    };
    try {
      question.type_id = await TestType.findOne({ name: questionDetails.type })
        ._id;
      let newQuestion = new Question(question);
      let answer = {
        question_id: newQuestion._id,
        options,
      };
      let newAnswer = new Answer(answer);
      await newQuestion.save();
      await newAnswer.save();
      res.status(201).json({ message: "MCQ created successfully" });
    } catch (err) {
      //! Error in creating mcq
      return res.status(500).json({
        message: `Error in creating Mcq`,
      });
    }
  }
};
const getQuestion = async (req, res) => {
  let questionId = req.params.id;
  try {
    let question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        message: `Question not found`,
      });
    } else {
      res.status(200).json({
        question,
        message: "Question is found",
      });
    }
  } catch (err) {
    //! Error in getting question
    return res.status(500).json({
      message: `Error in getting Mcq`,
    });
  }
};
const updateQuestion = async (req, res) => {
  let { id, statement, options } = req.body;
  let question = await Question.findById(id).populate({
    path: "type_id",
    model: "testTypes",
    select: "name",
  });
  if (question.type_id.name === "mcq") {
    try {
      if (statement) await Question.findByIdAndUpdate(id, { statement });
      if (options) {
        let updateDetails = {};
        options.A ? (updateDetails.A = options.A) : null;
        options.B ? (updateDetails.B = options.B) : null;
        options.C ? (updateDetails.C = options.C) : null;
        options.D ? (updateDetails.D = options.D) : null;
        options.correctOption
          ? (updateDetails.correctOption = options.correctOption)
          : null;
        await Answer.findOneAndUpdate(
          { question_id: question._id },
          updateDetails
        );
      }
      res.status(200).json({
        message: "Mcq Updated",
      });
    } catch (err) {
      //! Error in updating mcq
      return res.status(500).json({
        message: `Error in updating Mcq`,
      });
    }
  }
};
module.exports = {
  createQuestion,
  getQuestion,
  updateQuestion
};
