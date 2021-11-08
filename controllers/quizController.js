const {
  createQuizService,
  getQuizService,
  updateQuizService,
  getAllQuizzesWithContestId,
} = require("../services/quizService");

const createQuiz = async (req, res) => {
  let { name } = req.body;
  try {
    const response = await createQuizService(name);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in creating quiz
    return res.status(err.code).send(err.message);
  }
};
const getQuiz = async (req, res) => {
  let id = req.params.id;
  try {
    const response = await getQuizService(id);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in creating quiz
    return res.status(err.code).send(err.message);
  }
};
const updateQuiz = async (req, res) => {
  let { id, name } = req.body;
  try {
    const response = await updateQuizService(id, name);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in creating quiz
    return res.status(err.code).send(err.message);
  }
};
const getAllQuizzes = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getAllQuizzesWithContestId(id);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in getting quizzes with contest id
    return res.status(err.code).send(err.message);
  }
};
module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  getAllQuizzes
};
