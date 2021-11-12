const { createSubmissionService, getSubmissionsService, getAllSubmissionsService } = require("../services/submissionService");
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

module.exports = {
  createSubmission,
  getSubmission,
  getAllSubmissions,
};
