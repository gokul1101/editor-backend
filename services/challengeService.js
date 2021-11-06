const Question = require("../models/questions");
const Contest = require("../models/contests");

//IF THIS WILL BE CONTROLLER THEN USE AWAIT ONLY INSTEAD OF PROMISE
const createChallenge = async (question) => {
  //Format should be clearly defined above controller
  const { name } = question;
  try {
    const challenge = await Question.findOne({ name });
    if (challenge && !challenge.deleted_at) {
      return Promise.reject({
        code: 403,
        message: `challenge with ${name} already exist`,
      });
    } else {
      const newChallenge = new Question({ ...question });
      await newChallenge.save();
      return Promise.resolve({
        code: 201,
        message: `challenge with ${name} created successfully`,
      });
    }
  } catch (err) {
    return Promise.reject({
      code: 500,
      message: `challenge for ${name} cannot be created`,
    });
  }
};
const getChallenge = async (question) => {};
const getAllChallengesWithContestId = async (contest) => {
  const id = contest._id;
  try {
    const contest = await Contest.findById(id);
    if (!contest || contest.deleted_at) {
      return Promise.reject({
        code: 404,
        message: `contest with given id ${id} is not found`,
      });
    } else {
      const challenges = await Question.find({ contest_id: id });
      if (challenges) {
        return Promise.resolve({
          code: 200,
          message: `challenges that are available`,
          challenges,
        });
      } else {
        return Promise.reject({
          code: 404,
          message: `Challenges not available`,
        });
      }
    }
  } catch (err) {
    return Promise.reject({
      code: 500,
      message: `Error in getting challenges for contest id ${id}`,
    });
  }
};
const updateChallenge = async () => {};
const deleteChallenge = async () => {};

module.exports = {
  createChallenge,
  getChallenge,
  getAllChallengesWithContestId,
  updateChallenge,
  deleteChallenge,
};
