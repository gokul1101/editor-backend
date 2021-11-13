const Quiz = require("../models/quizzes");
const { isObjectId } = require("../utils/helper");
const createQuizService = async (name) => {
  if (!name)
    return Promise.reject({
      code: 405,
      message: `Client error`,
    });
  try {
    let quiz = await Quiz.findOne({ name });
    if (quiz) {
      return Promise.reject({
        code: 403,
        message: `${name} Quiz already exists.`,
      });
    } else {
      const newQuiz = new Quiz({ name });
      newQuiz.save();
      return Promise.resolve({
        code: 201,
        message: `${name} Quiz created.`,
        newQuiz,
      });
    }
  } catch (err) {
    //! Error in creating quiz
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `${name} Quiz cannot be created`,
    });
  }
};
const getQuizService = async (id) => {
  if (!isObjectId(id)) {
    return Promise.reject({
      code: 404,
      message: `Quiz not found.`,
    });
  }
  try {
    let quiz = await Quiz.findById(id);
    if (quiz) {
      return Promise.resolve({
        code: 200,
        message: `Quiz has been found.`,
        quiz,
      });
    }
  } catch (err) {
    //! Error in getting quiz
    return Promise.reject({
      code: 500,
      message: `Error in getting Quiz`,
    });
  }
};
const updateQuizService = async (id, name, total_mcqs) => {
  try {
    let quiz = await Quiz.findOne({ name });
    if (quiz) {
      return Promise.reject({
        code: 403,
        message: `${name} Quiz already exists.`,
      });
    } else {
      if(name) quiz.name = name;
      if(total_mcqs) quiz.total_mcqs = total_mcqs;
      await quiz.save();
      return Promise.resolve({
        code: 200,
        message: "Quiz updated",
      });
    }
  } catch (err) {
    //! Error in updating quiz
    return Promise.reject({
      code: 500,
      message: `Error in updating Quiz`,
    });
  }
};
const getAllQuizzesWithContestId = async (id) => {
  try {
    const Quizzes = await Quiz.find({ contest_id: id });
    if (!Quizzes) {
      return Promise.reject({
        code: 404,
        message: `Quizzes not available`,
      });
    }
    return Promise.resolve({
      code: 200,
      message: `Quizzes that are available`,
      Quizzes,
    });
  } catch (err) {
    return Promise.reject({
      code: 500,
      message: `Error in getting Quizzes with contest id`,
    });
  }
};
module.exports = {
  createQuizService,
  getQuizService,
  updateQuizService,
  getAllQuizzesWithContestId,
};
