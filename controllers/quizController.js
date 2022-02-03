const { updateQuizService } = require("../services");
const {
  createQuizService,
  getQuizService,
  getAllQuizzesWithContestId,
  deleteQuizService,
} = require("../services/quizService");
const { decryption, encryption } = require("../utils/crypto-js");

const createQuiz = async (req, res) => {
  let { name, contest_id } = req.body;
  try {
    const { status, ...response } = await createQuizService(name, contest_id);
    return res.status(status).send(response);
  } catch ({ status, message }) {
    //! Error in creating quiz
    return res.status(status).json({ message });
  }
};
const getQuiz = async (req, res) => {
  let { id } = req.query;
  try {
    const { status, ...response } = await getQuizService(id);
    res.status(status).send(response);
  } catch ({ status, message }) {
    //! Error in getting quiz
    return res.status(status).json({ message });
  }
};
const updateQuiz = async (req, res) => {
  let quiz = req.body;
  try {
    const { status, ...response } = await updateQuizService(quiz);
    res.status(status).send(response);
  } catch ({ status, message }) {
    //! Error in updating quiz
    return res.status(status).json({ message });
  }
};
const getAllQuizzes = async (req, res) => {
  const { id } = req.query;
  try {
    const { status, ...response } = await getAllQuizzesWithContestId(id);
    return res.status(status).send(response);
  } catch ({ status, message }) {
    //! Error in getting quizzes with contest id
    return res.status(status).json({ message });
  }
};
const deleteQuiz = async (req, res) => {
  let quiz = req.body;
  try {
    const { status, ...response } = await deleteQuizService(quiz);
    return res.status(status).send(response);
  } catch ({ status, message }) {
    return res.status(status).json({ message });
  }
};
module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  getAllQuizzes,
  deleteQuiz,
};
