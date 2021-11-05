const Quiz = require("../models/quizzes");
const createQuiz = async (quizDetails) => {
  let name = quizDetails.name;
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
      });
    }
  } catch (err) {
    //! Error in creating quiz
    return Promise.reject({
      code: 500,
      message: `${name} Quiz cannot be created`,
    });
  }
};
const getQuiz = async (quizDetails) => {
  try {
    let quiz;
    if (quizDetails._id) quiz = await Quiz.findById(quizDetails._id);
    else if (quizDetails.name)
      quiz = await Quiz.findOne({ name: quizDetails.name });
    if (quiz) {
      return Promise.resolve({
        code: 200,
        message: `Quiz has been found.`,
        quiz,
      });
    } else {
      return Promise.reject({
        code: 404,
        message: `Quiz not found.`,
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
const updateQuiz = async (quizId, quizDetails) => {
  try {
    if (quizDetails.name) {
      let quiz = await Quiz.findOne({ name: quizDetails.name });
      if (quiz) {
        return Promise.reject({
          code: 403,
          message: `${quizDetails.name} Quiz already exists.`,
        });
      }
    } else {
      await Quiz.findByIdAndUpdate(quizId, quizDetails);
      return Promise.resolve({
        code: 200,
        message: "Quiz updated",
      });
    }
  } catch (err) {
    //! Error in updating quiz
    return Promise.reject({
      code: 500,
      message: `Error in getting Quiz`,
    });
  }
};
module.exports = {
  createQuiz,
};
