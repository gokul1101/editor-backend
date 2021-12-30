const Quiz = require("../models/quizzes");
const Question = require("../models/questions") 
const Answer = require("../models/answers") 
const { updateContestService } = require("./contestService");
const { deleteMCQ } = require("./mcqService");
const createQuizService = async (name, contest_id) => {
  if (!name)
    return Promise.reject({
      status: 405,
      message: `Invalid quiz name.`,
    });
  try {
    let quiz = await Quiz.findOne({ name });
    if (quiz) {
      return Promise.reject({
        status: 403,
        message: `${name} Quiz already exists.`,
      });
    } else {
      const newQuiz = new Quiz({ name, contest_id });
      await newQuiz.save();
      return Promise.resolve({
        status: 201,
        message: `${name} Quiz created.`,
        quiz: newQuiz,
      });
    }
  } catch (err) {
    //! Error in creating quiz
    console.log(err);
    return Promise.reject({
      status: 500,
      message: `${name} Quiz cannot be created`,
    });
  }
};
const getQuizService = async (id) => {
  try {
    let quiz = await Quiz.findById(id);
    if (!quiz) {
      return Promise.reject({
        status: 404,
        message: `Quiz not found.`,
      });
    }
    return Promise.resolve({
      status: 200,
      message: `Quiz has been found.`,
      quiz,
    });
  } catch (err) {
    //! Error in getting quiz
    return Promise.reject({
      status: 500,
      message: `Error in getting Quiz`,
    });
  }
};
const updateQuizService = async ({ id, name, total_mcqs, contest_id }) => {
  try {
    let quiz = await Quiz.findById(id);
    if (!quiz) {
      return Promise.reject({
        status: 404,
        message: `${name} Quiz not found.`,
      });
    } else {
      if (name) quiz.name = name;
      if (total_mcqs) {
        quiz.total_mcqs = quiz.total_mcqs + total_mcqs;
        await updateContestService({
          id: quiz.contest_id,
          max_score: total_mcqs,
        });
      }
      if (contest_id) quiz.contest_id = contest_id;
      await quiz.save();
      return Promise.resolve({
        status: 200,
        message: "Quiz updated",
      });
    }
  } catch (err) {
    console.log(err);
    //! Error in updating quiz
    return Promise.reject({
      status: 500,
      message: `Error in updating Quiz`,
    });
  }
};
const getAllQuizzesWithContestId = async (id) => {
  try {
    const quizzes = await Quiz.find({ contest_id: id });
    if (!quizzes) {
      return Promise.reject({
        status: 404,
        message: `Quizzes not available`,
      });
    }
    return Promise.resolve({
      status: 200,
      message: `Quizzes that are available`,
      quizzes,
    });
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: `Error in getting Quizzes with contest id`,
    });
  }
};
const deleteQuizService = async ({ id, name }) => {
  try {
    const quiz = {max_score:0,contest_id:null,_id:null}
    if (id) {
      const { total_mcqs, contest_id ,_id} = (await Quiz.findByIdAndDelete(id));
      quiz = {max_score:total_mcqs,contest_id,_id}
    } else if (name) {
      const { total_mcqs, contest_id ,_id} = (await Quiz.findOneAndDelete({
        name,
      }));
      quiz = {max_score:total_mcqs,contest_id,_id}
    }
    if (!quiz.contest_id)
      return Promise.reject({ status: 404, message: `Quizz not found` });

    const {_id} = (await Question.find({quiz_id:quiz._id}))
    Promise.all(_id.map(async id => await deleteMCQ(id,null,quiz._id,false)))
      if (quiz.max_score)
      await updateContestService({ max_score: -(quiz.max_score), id: quiz.contest_id });
    
    return Promise.resolve({
      status: 202,
      message: `Quiz deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    return Promise.reject({
      status: 500,
      message: `Internal server error`,
    });
  }
};
module.exports = {
  createQuizService,
  getQuizService,
  updateQuizService,
  getAllQuizzesWithContestId,
  deleteQuizService,
};
