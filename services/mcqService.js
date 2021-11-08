const TestType = require("../models/testTypes");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const createMCQ = async (questionDetails) => {
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
    return Promise.resolve({
      code: 201,
      message: "MCQ created successfully",
    });
  } catch (err) {
    //! Error in creating mcq
    return Promise.reject({
      code: 500,
      message: `Error in creating Mcq`,
    });
  }
};
const getMCQ = async (questionId) => {
  try {
    let question = await Question.findById(questionId);
    if (!question) {
      return Promise.reject({
        code: 404,
        message: `MCQ not found`,
      });
    } else {
      return Promise.resolve({
        code: 200,
        message: "MCQ is found",
        question,
      });
    }
  } catch (err) {
    //! Error in getting MCQ
    return Promise.reject({
      code: 500,
      message: `Error in getting Mcq`,
    });
  }
};
const updateMCQ = async ({ id, statement, options }) => {
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
        await Answer.findOneAndUpdate({ question_id: id }, updateDetails);
    }
    return Promise.resolve({
      code: 200,
      message: "Mcq Updated",
    });
  } catch (err) {
    //! Error in updating mcq
    return Promise.reject({
      code: 500,
      message: `Error in updating Mcq`,
    });
  }
};
const getAllMcqWithQuizID = async (id) => {
  try {
    const mcqs = await Question.find({ quiz_id: id });
    return Promise.resolve({
      code: 200,
      message: "MCQs has been found.",
      mcqs,
    });
  } catch (err) {
    //! Error in getting mcqs
    return Promise.reject({
      code: 500,
      message: `Error in getting mcqs`,
    });
  }
};
module.exports = {
  createMCQ,
  getMCQ,
  updateMCQ,
  getAllMcqWithQuizID,
};
