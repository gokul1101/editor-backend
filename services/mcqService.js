const Question = require("../models/questions");
const Answer = require("../models/answers");
const { updateQuizService } = require("./quizService");
const createMCQ = async ({ type_id, quiz_id, statement, options }) => {
  let question = {
    type_id,
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
    await updateQuizService({ id: quiz_id, total_mcqs: 1 });
    return Promise.resolve({
      code: 201,
      message: "MCQ created successfully.",
      mcq: {
        question_id: newQuestion._id,
        answer_id: newAnswer._id,
        statement: newQuestion.statement,
        options: newAnswer.options,
      },
    });
  } catch (err) {
    //! Error in creating mcq
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Error in creating Mcq`,
    });
  }
};
const getMCQ = async (id, role) => {
  try {
    let question = await Question.findById(id);
    if (!question) {
      return Promise.reject({
        code: 404,
        message: `MCQ not found`,
      });
    } else {
      let { _id, options } = await Answer.findOne({ question_id: id });
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
const updateMCQ = async ({
  question_id,
  answer_id,
  quiz_id,
  statement,
  options,
}) => {
  try {
    let question = {};
    if (statement) question.statement = statement;
    if (quiz_id) question.quiz_id = quiz_id;
    if (Object.keys(question).length > 0)
      await Question.findByIdAndUpdate(question_id, { ...question });
    if (options) {
      let updateOptions = {};
      options.A ? (updateOptions["options.A"] = options.A) : null;
      options.B ? (updateOptions["options.B"] = options.B) : null;
      options.C ? (updateOptions["options.C"] = options.C) : null;
      options.D ? (updateOptions["options.D"] = options.D) : null;
      options.correctOption
        ? (updateOptions["options.correctOption"] = options.correctOption)
        : null;

      await Answer.findByIdAndUpdate(answer_id, {
        $set: { ...updateOptions },
      });
    }
    return Promise.resolve({
      code: 200,
      message: "Mcq Updated",
    });
  } catch (err) {
    //! Error in updating mcq
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Error in updating Mcq`,
    });
  }
};
const getAllMcqWithQuizID = async (id, page, limit, flag) => {
  try {
    let response = {};
    const count = await Question.countDocuments();
    response.modelCount = count;
    const questions = await Question.find({ quiz_id: id })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    let mcqs = [];
    for (let i = 0; i < questions.length; i++) {
      let mcq = {
        statement: questions[i].statement,
      };
      const answer = await Answer.findOne({ question_id: questions[i]._id });
      mcq.id = answer._id;
      mcq.options = { ...answer.options };
      if (!flag) delete mcq["options"]["correctOption"];
      mcqs.push({
        ...mcq,
        question_id: questions[i]._id,
        answer_id: answer._id,
      });
    }
    return Promise.resolve({
      code: 200,
      message: "MCQs has been found.",
      mcqs,
    });
  } catch (err) {
    //! Error in getting mcqs
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Error in getting mcqs`,
    });
  }
};
const deleteMCQ = async ({ question_id, answer_id, quiz_id }) => {
  try {
    if (!question_id || !answer_id) {
      return Promise.reject({
        code: 406,
        message: `Invalid parameters found`,
      });
    }
    const question_result = await Question.findByIdAndDelete(question_id);
    await updateQuizService({ id: quiz_id, total_mcqs: -1 });
    if (question_result) {
      const answer_result = await Answer.findByIdAndDelete(answer_id);
      if (answer_result) {
        return Promise.resolve({
          code: 202,
          message: "MCQ question deleted Sucessfully",
        });
      }
    }
    //TODO  : May be for some condition
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Error in deleting Mcq`,
    });
  }
};
module.exports = {
  createMCQ,
  getMCQ,
  updateMCQ,
  deleteMCQ,
  getAllMcqWithQuizID,
};
