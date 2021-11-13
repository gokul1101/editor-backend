const {
  createSubmissionService,
  getSubmissionsService,
  getAllSubmissionsService,
} = require("../services/submissionService");
const Answer = require("../models/answers");
const createSubmission = async (req, res) => {
  let submissionDetails = req.body;
  try {
    const response = await createSubmissionService(submissionDetails);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in creating submission
    return res.status(err.code).send(err.message);
  }
};
const getSubmission = async (req, res) => {
  let submissionDetails = req.body;
  try {
    const response = await getSubmissionsService(submissionDetails);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in getting submissions
    return res.status(err.code).send(err.message);
  }
};
const getAllSubmissions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const response = await getAllSubmissionsService(page, limit);
    res.status(response.code).send(response);
  } catch (err) {
    //! Error in getting submissions
    return res.status(err.code).send(err.message);
  }
};

const quizSubmission = async (req, res) => {
  const answers = req.body;
  const entries = Object.entries(answers);
  let score = 0;
  for (const [question_id, option] of entries) {
    try {
      const answer = await Answer.findOne({ question_id });
      if (option === answer.options.correctOption) score++;
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200).json({score});
};

module.exports = {
  createSubmission,
  getSubmission,
  getAllSubmissions,
};
