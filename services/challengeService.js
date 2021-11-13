const Question = require("../models/questions");
const Contest = require("../models/contests");
const Difficuly = require("../models/difficulties");
const { mapDifficultyId, mapDifficultyLevel } = require("../utils/helper");

//IF THIS WILL BE CONTROLLER THEN USE AWAIT ONLY INSTEAD OF PROMISE
const createChallenge = async (question) => {
  //Format should be clearly defined above controller
  const { name, difficulty_id } = question;
  try {
    //Checking if challenge already exist with same
    const challenge = await Question.findOne({ name });
    if (challenge && !challenge.deleted_at) {
      return Promise.reject({
        code: 403,
        message: `challenge with name ${name} already exist`,
      });
    } else {
      //Populating id with string
      console.log(question);
      question.difficulty_id = await mapDifficultyId(difficulty_id);
      const newChallenge = new Question(question);
      await newChallenge.save();
      return Promise.resolve({
        code: 201,
        message: `challenge with ${name} created successfully`,
      });
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `challenge for ${name} cannot be created `,
    });
  }
};

const getChallenge = async (question) => {
  const id = question._id;
  try {
    const exist_question = await Question.findById(id);
    if (!exist_question || exist_question.deleted_at) {
      return Promise.reject({
        code: 404,
        message: `Question with id ${id} had not found`,
      });
    } else {
      exist_question.difficulty = await mapDifficultyLevel(
        exist_question.difficulty_id
      );
      return Promise.resolve({
        code: 200,
        message: `Question found`,
        question: exist_question,
      });
    }
  } catch (err) {
    return Promise.reject({
      code: 500,
      message: `Can't get the question with id ${id}`,
    });
  }
};

const updateChallenge = async (question) => {
  const id = question.id;
  try {
    const exist_question = await Question.findById(id);
    if (!exist_question || exist_question.deleted_at) {
      return Promise.resolve({
        code: 404,
        message: `Question with id ${id} had not found`,
      });
    } else {
      if (question.name) {
        const questionWithNewName = await Question.findOne({
          name: question.name,
          deleted_at: null,
        });
        if (questionWithNewName) {
          return Promise.reject({
            code: 403,
            message: `New name for this question already taken`,
          });
        }
      }
      if (question.difficulty_id)
        question.difficulty_id = await mapDifficultyId(question.difficulty_id);
      await Question.findByIdAndUpdate(
        exist_question._id,
        { ...question, update_at: new Date() },
        { new: true }
      );
      return Promise.resolve({
        code: 200,
        message: `Question with id ${id} updated successfully`,
      });
    }
  } catch (err) {
    return Promise.reject({
      code: 500,
      message: `Can't update the question with id ${id}`,
    });
  }
};

const getAllChallengesWithContestId = async (id) => {
  try {
    const challenges = await Question.find({ contest_id: id }).populate({
      path: "difficulty_id",
      model: "difficulty",
      select: "level",
    });
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
  } catch (err) {
    return Promise.reject({
      code: 500,
      message: `Error in getting challenges for contest id ${id}`,
    });
  }
};

const deleteChallenge = async () => {};

module.exports = {
  createChallenge,
  getChallenge,
  getAllChallengesWithContestId,
  updateChallenge,
  deleteChallenge,
};
