const Submission = require("../models/submissions");
const User = require("../models/users");
const Contest = require("../models/contests");
const Answer = require("../models/answers");
const Question = require("../models/questions");
const { compilerService } = require("./compilerService");
const { updateSessionService } = require("./sessionService");
const createSubmissionService = async (submissionDetails) => {
  let { user_id, contest_id, quizzes, challenges } = submissionDetails;
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
    let submission = await Submission.findOne({ user_id, contest_id });
    if (submission)
      return Promise.reject({
        code: 403,
        message: `Contest already submitted.`,
      });
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    let total_score = 0;
    let quizScore = await Promise.all(
      quizzes.map(async (quiz) => {
        try {
          const { score } = await quizSubmissionService(quiz);
          return score;
        } catch (err) {
          console.log(err);
        }
        return 0;
      })
    );
    total_score += quizScore.reduce(reducer);
    let challengeScore = await Promise.all(
      challenges.map(async (challenge) => {
        try {
          const { score } = await challengeSubmissionService(
            challenge.question_id,
            challenge.code,
            challenge.lang,
            true
          );
          return score;
        } catch (err) {
          console.log(err);
        }
        return 0;
      })
    );
    total_score += challengeScore.reduce(reducer);
    let newSubmission = new Submission({
      user_id,
      contest_id,
      score: total_score,
    });
    await newSubmission.save();
    await updateSessionService(contest_id, user_id, new Date());
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
    response.modelCount = await Submission.countDocuments();
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
const quizSubmissionService = async (quizAnswers) => {
  let score = 0;
  const answers = await Promise.all(
    quizAnswers.map(async ({ id, option }) => {
      try {
        const answer = await Answer.findById(id);
        if (option === answer.options.correctOption) return true;
      } catch (err) {
        console.log(err);
      }
      return false;
    })
  );
  answers.forEach((ans) => (ans ? score++ : null));
  return Promise.resolve({
    code: 200,
    score,
  });
};
const challengeSubmissionService = async (
  question_id,
  code,
  lang,
  submission = false
) => {
  if(submission && !question_id) return Promise.resolve({ code: 200, score: 0 }); 
  let complilationError = false,
    isSampleFailed = false;
  score = 0;
  try {
    const max_score = (await Question.findById(question_id))?.max_score || 1;
    const testcases = (await Answer.findOne({ question_id }))?.testcases || {};
    const totalTestCases =
      testcases?.sample?.length + testcases?.hidden?.length;
    let sampleTestCaseOutput = [];
    for (let i = 0; i < testcases?.sample.length; i++) {
      try {
        let { output } = await compilerService(
          code,
          testcases?.sample[i].input,
          lang
        );
        output = output.replace(/[\n\r]+$/, "");
        let testCaseOutput = {
          expectedOutput: testcases?.sample[i].output,
          actualOutput: output,
        };
        if (testcases?.sample[i].output === output) {
          if (submission) score++;
          testCaseOutput.errors = false;
        } else {
          isSampleFailed = true;
          testCaseOutput.errors = true;
        }
        sampleTestCaseOutput.push(testCaseOutput);
      } catch (err) {
        console.log(err);
        if (i == 0) {
          return Promise.resolve({
            code: 200,
            errors: true,
            err: err.err,
          });
        }
        complilationError = true;
        sampleTestCaseOutput.push({
          expectedOutput: testcases?.sample[i].output,
          actualOutput: err,
          errors: true,
        });
        break;
      }
    }
    if (!submission && (complilationError || isSampleFailed))
      return Promise.resolve({
        code: 200,
        isSampleFailed,
        sample: sampleTestCaseOutput,
      });
    const hiddenTestCaseOutput = await Promise.all(
      testcases?.hidden?.map(async (testcase) => {
        try {
          let { output } = await compilerService(code, testcase.input, lang);
          output = output.replace(/[\n\r]+$/, "");
          if (output === testcase.output) {
            if (submission) score++;
            return true;
          } else return false;
        } catch (err) {
          console.log(err);
          return false;
        }
      })
    );
    if (submission) {
      let total_score = Math.round((score / totalTestCases) * max_score);
      return Promise.resolve({ code: 200, score: total_score });
    }
    return Promise.resolve({
      code: 200,
      sample: sampleTestCaseOutput,
      hidden: hiddenTestCaseOutput,
    });
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: "Error in checking testcases.",
    });
  }
};
module.exports = {
  createSubmissionService,
  getSubmissionsService,
  getAllSubmissionsService,
  quizSubmissionService,
  challengeSubmissionService,
};
