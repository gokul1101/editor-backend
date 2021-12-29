const {
  createQuizService,
  getQuizService,
  updateQuizService,
  getAllQuizzesWithContestId,
} = require("../services/quizService");

const createQuiz = async (req, res) => {
  let { name, contest_id } = req.body;
  try {
    const response = await createQuizService(name, contest_id);
    res.status(response.status).send(response);
  } catch (err) {
    //! Error in creating quiz
    return res.status(err.status).send(err.message);
  }
};
const getQuiz = async (req, res) => {
  let { id } = req.query;
  try {
    const response = await getQuizService(id);
    res.status(response.status).send(response);
  } catch (err) {
    //! Error in getting quiz
    return res.status(err.status).send(err.message);
  }
};
const updateQuiz = async (req, res) => {
  let quiz = req.body;
  try {
    const response = await updateQuizService(quiz);
    res.status(response.status).send(response);
  } catch (err) {
    //! Error in updating quiz
    return res.status(err.status).send(err.message);
  }
};
const getAllQuizzes = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await getAllQuizzesWithContestId(id);
    res.status(response.status).send(response);
  } catch (err) {
    //! Error in getting quizzes with contest id
    return res.status(err.status).send(err.message);
  }
};
module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  getAllQuizzes,
};
