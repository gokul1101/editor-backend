const Submission = require("../models/submissions");
const User = require("../models/users");
const Contest = require("../models/contests");
const createSubmissionService = async (submissionDetails) => {
  let { user_id, contest_id } = submissionDetails;
  try {
    let user = await User.findById(user_id);
    if (!user)
      return Promise.reject({
        code: 404,
        message: `User not found`,
      });
    let contest = await Contest.findById(contest_id);
    if (!contest)
      return Promise.reject({
        code: 404,
        message: `Contest not found`,
      });
    let newSubmission = new Submission(submissionDetails);
    await newSubmission.save();
    return Promise.resolve({
      code: 201,
      message: `Submitted successfully!`,
    });
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Error in submitting.`,
    });
  }
};
const getSubmissionsService = async (submissionDetails) => {
  let { user_id, contest_id } = submissionDetails;
  try {
    let submissions =
      user_id && contest_id
        ? await Submission.find({ user_id, contest_id })
        : user_id
        ? await Submission.find({ user_id })
        : contest_id
        ? await Submission.find({ contest_id })
        : null;
    return Promise.resolve({
      code: 200,
      message: `Submissions found!`,
      submissions,
    });
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Error in getting submissions.`,
    });
  }
};
const getAllSubmissionsService = async (page, limit) => {
  let response = {};
  try {
    if (page == 1) {
      const count = await Submission.countDocuments();
      response.modelCount = count;
    }
    const submissions = await Submission.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit);
    response.total = submissions.length;
    response.submissions = submissions;
    return Promise.resolve({
      code: 200,
      message: `Submissions found!`,
      response,
    });
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Error in getting submissions.`,
    });
  }
};

module.exports = {
  createSubmissionService,
  getSubmissionsService,
  getAllSubmissionsService,
};
