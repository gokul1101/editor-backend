const TestType = require("../models/testTypes");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const { isObjectId } = require("../utils/helper");
const createMCQ = async ({ quiz_id, statement, type, options }) => {
  let question = {
    quiz_id,
    statement,
    max_score: 1,
  };
  try {
    let testType = await TestType.findOne({ name: type });
    question.type_id = testType._id;
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
      let { options } = await Answer.findOne({ question_id: questionId });
      let mcqOptions = {
        A: options.A,
        B: options.B,
        C: options.C,
        D: options.D,
      };
      return Promise.resolve({
        code: 200,
        message: "MCQ is found",
        statement: question.statement,
        options: mcqOptions,
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
    if (options)
      await Answer.findOneAndUpdate({ question_id: id }, { options });
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
    const mcqs = questions.map(question => question._id)
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
