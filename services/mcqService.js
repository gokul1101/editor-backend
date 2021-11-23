const Question = require("../models/questions");
const Answer = require("../models/answers");
const { isObjectId } = require("../utils/helper");
const createMCQ = async ({ quiz_id, statement, options }) => {
  let question = {
    quiz_id,
    statement,
  };
  let newQuestion = new Question(question);
  let answer = {
    question_id: newQuestion._id,
    options,
  };
  let newAnswer = new Answer(answer);
  try {
    await newQuestion.save();
    await newAnswer.save();
    return Promise.resolve({
      code: 201,
      message: "MCQ created successfully.",
    });
  } catch (err) {
    //! Error in creating mcq
    console.log(err)
    return Promise.reject({
      code: 500,
      message: `Error in creating Mcq`,
    });
  }
};
const getMCQ = async (questionId) => {
  if (!isObjectId(questionId)) {
    return Promise.reject({
      code: 404,
      message: `MCQ not found.`,
    });
  }
  try {
    let question = await Question.findById(questionId);
    if (!question) {
      return Promise.reject({
        code: 404,
        message: `MCQ not found`,
      });
    } else {
      let { _id, options } = await Answer.findOne({ question_id: questionId });
      let mcqOptions = {
        A: options.A,
        B: options.B,
        C: options.C,
        D: options.D,
      };
      return Promise.resolve({
        code: 200,
        message: "MCQ is found",
        question: {
          id: question._id,
          statement: question.statement,
        },
        answer: {
          id: _id,
          options: mcqOptions,
        },
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
const updateMCQ = async ({ question_id, answer_id, statement, options }) => {
  try {
    if (statement) await Question.findByIdAndUpdate(question_id, { statement });
    if (options) {
      let answer = await Answer.findById(answer_id);
      options.A ? (answer.options.A = options.A) : null;
      options.B ? (answer.options.B = options.B) : null;
      options.C ? (answer.options.C = options.C) : null;
      options.D ? (answer.options.D = options.D) : null;
      options.correctOption
        ? (answer.options.correctOption = options.correctOption)
        : null;
      await answer.save();
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
    const questions = await Question.find({ quiz_id: id });
    const mcqs = questions.map((question) => question._id);
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
