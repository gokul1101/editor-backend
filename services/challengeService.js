const Question = require("../models/questions");
const { mapDifficultyId } = require("../utils/helper");
const { updateContestService } = require("./contestService");
const { getTestCasesService } = require("./testcaseService");

//IF THIS WILL BE CONTROLLER THEN USE AWAIT ONLY INSTEAD OF PROMISE
const createChallenge = async (question) => {
  //Format should be clearly defined above controller
  const { name, difficulty_id, max_score, contest_id } = question;
  try {
    //Checking if challenge already exist with same
    const challenge = await Question.findOne({ name });
    if (challenge) {
      return Promise.reject({
        code: 403,
        message: `challenge with name ${name} already exist`,
      });
    } else {
      question.difficulty_id = await mapDifficultyId(difficulty_id);
      const newChallenge = new Question(question);
      await newChallenge.save();
      await updateContestService({ id: contest_id, max_score });
      return Promise.resolve({
        code: 201,
        message: `Challenge created successfully`,
      });
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Challenge cannot be created `,
    });
  }
};

const getChallenge = async (id, role) => {
  try {
    let question = await Question.findById(id).populate([
      {
        path: "difficulty_id",
        model: "difficulty",
        select: "level",
      },
    ]);
    if (!question) {
      return Promise.reject({
        code: 404,
        message: `Question with id ${id} had not found`,
      });
    } else {
      try {
        const { code, message, testcases } = await getTestCasesService(
          question._id,
          role
        );
        if (code === 200) {
          question = { ...question._doc, testcases };
        }
      } catch (err) {
        if (err.code !== 404) {
          throw "Error on getting testcases";
        }
      }
      return Promise.resolve({
        code: 200,
        message: `Question found`,
        question,
      });
    }
  } catch (err) {
    return Promise.reject({
      code: 500,
      message: `Can't get the question.`,
    });
  }
};

const updateChallenge = async (question) => {
  const { id, max_score } = question;
  try {
    const exist_question = await Question.findById(id);
    if (!exist_question) {
      return Promise.resolve({
        code: 404,
        message: `Question not found`,
      });
    } else {
      if (question.name) {
        const questionWithNewName = await Question.findOne({
          name: question.name,
        });
        if (
          questionWithNewName &&
          JSON.stringify(questionWithNewName._id) !== JSON.stringify(id)
        ) {
          return Promise.reject({
            code: 403,
            message: `Question name not available.`,
          });
        }
      }
      if (question.difficulty_id)
        question.difficulty_id = await mapDifficultyId(question.difficulty_id);
      if (question.type_id) delete question["type_id"];
      if (max_score)
        await updateContestService({
          max_score: max_score - exist_question.max_score,
        });
      await Question.findByIdAndUpdate(id, {
        ...question,
        update_at: new Date(),
      });
      return Promise.resolve({
        code: 201,
        message: `Question updated successfully`,
      });
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `Can't update the question.`,
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

module.exports = {
  createChallenge,
  getChallenge,
  getAllChallengesWithContestId,
  updateChallenge,
};
