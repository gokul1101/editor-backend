const Contest = require("../models/contests");
const Execution = require("../models/execution");
const Question = require("../models/questions");
const User = require("../models/users");

const createExecutionService = async ({
  id,
  user_id,
  contest_id,
  question_id,
  code,
}) => {
  try {
    let execution;
    if (id) {
      execution = await Execution.findByIdAndUpdate(id, { code });
      return Promise.resolve();
    }
    const user = await User.findById(user_id);
    if (!user)
      return Promise.reject({
        status: 404,
        message: "User not found",
      });
    const contest = await Contest.findById(contest_id);
    if (!contest)
      return Promise.reject({
        status: 404,
        message: "Contest not found",
      });
    const question = await Question.findById(question_id);
    if (!question)
      return Promise.reject({
        status: 404,
        message: "Question not found",
      });
    execution = new Execution({ user_id, contest_id, question_id, code });
    await execution.save();
    return Promise.resolve({
      status: 201,
      execution,
      message: "New execution created.",
    });
  } catch (e) {
    console.log(err);
    return Promise.reject({
      status: 500,
      message: "Error in creating execution",
    });
  }
};

const getExecutionService = async (id) => {
  try {
    let execution = await Execution.findById(id);
    if (!execution) {
      return Promise.reject({
        status: 404,
        message: "Execution not found",
      });
    }
    return Promise.resolve({
      status: 200,
      execution,
      message: "Execution Found.",
    });
  } catch (e) {
    console.log(err);
    return Promise.reject({
      status: 500,
      message: "Error in getting execution",
    });
  }
};

const updateExecutionService = async (id, code) => {
  try {
    let execution = await Execution.findByIdAndUpdate(id, { code });
    if (!execution) {
      return Promise.reject({
        status: 404,
        message: "Execution not found",
      });
    }
    return Promise.resolve({
      status: 200,
      execution,
      message: "Execution updated.",
    });
  } catch (e) {
    console.log(err);
    return Promise.reject({
      status: 500,
      message: "Error in updating execution",
    });
  }
};

module.exports = {
  createExecutionService,
  getExecutionService,
  updateExecutionService,
};
