const TestType = require("../models/testTypes");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const {
  createMCQ,
  getMCQ,
  updateMCQ,
  getAllMcqWithQuizID,
} = require("../services/mcqService");
const {
  createChallenge,
  getChallenge,
  updateChallenge,
  getAllChallengesWithContestId,
} = require("../services/challengeService");
const createQuestion = async (req, res) => {
  let questionDetails = req.body;
  let functions = [createMCQ, createChallenge],
    index;
  if (questionDetails.type === "mcq") index = 0;
  else if (questionDetails.type === "problem") index = 1;
  try {
    questionDetails.type_id = (
      await TestType.findOne({ name: questionDetails.type })
    )._id;
    let { code, message } = await functions[index](questionDetails);
    res.status(code).send(message);
  } catch (err) {
    //! Error in creating question
    return res.status(err.code).send(err.message);
  }
};
const getQuestion = async (req, res) => {
  let questionId = req.params.id;
  let type = req.query.type;
  let functions = [getMCQ, getChallenge],
    index;
  if (type === "mcq") index = 0;
  else if (type === "problem") index = 1;
  try {
    let response = await functions[index](questionId);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in getting question
    return res.status(err.code).send(err.message);
  }
};
const updateQuestion = async (req, res) => {
  let questionDetails = req.body;
  let question = await Question.findById(questionDetails.id).populate({
    path: "type_id",
    model: "testTypes",
    select: "name",
  });
  let functions = [updateMCQ, updateChallenge],
    index;
  if (type === "mcq") index = 0;
  else if (type === "problem") index = 1;
  try {
    let response = await functions[index](question);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in updating question
    return res.status(err.code).send(err.message);
  }
};
const getAllMCQS = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getAllMcqWithQuizID(id);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in getting mcqs with quiz id
    return res.status(err.code).send(err.message);
  }
};
const getAllChallenges = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getAllChallengesWithContestId(id);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in getting mcqs with quiz id
    return res.status(err.code).send(err.message);
  }
};

module.exports = {
  createQuestion,
  getQuestion,
  updateQuestion,
  getAllMCQS,
  getAllChallenges,
};
