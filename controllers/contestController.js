const Contest = require("../models/contests");
const {
  getAllChallengesWithContestId,
} = require("../services/challengeService");
const {
  createContestService,
  updateContestService,
  getContestService,
  getAllContestWithFilter,
} = require("../services/contestService");
const { getAllQuizzesWithContestId } = require("../services/quizService");
const {
  getSessionService,
  createSessionService,
} = require("../services/sessionService");
const { encryption, decryption } = require("../utils/crypto-js");

const createContest = async (req, res) => {
  let { encryptedData } = req.body;
  let contest = decryption(encryptedData);
  try {
    let { status, ...response } = await createContestService(contest);
    response = encryption(response);
    return res.status(status).json({ response });
  } catch ({ status, message }) {
    message = encryption(message);
    return res.status(status).json(message);
  }
};
const getContest = async (req, res) => {
  const { id, code } = req.query;
  try {
    let { status, message, contest } = await getContestService(
      id,
      code,
      req.user.role_id
    );
    res.status(status).send({ message, contest });
  } catch ({ status, message }) {
    res.status(status).send(message);
  }
};
const getContestForDashboard = async (req, res) => {
  const { id, code } = req.query;
  const user_id = req.user._id;
  try {
    let { status, contest } = await getContestService(
      id,
      code,
      req.user.role_id
    );
    let response = {
      contest,
      session: {},
      quizzes: [],
      challenges: [],
    };
    if (status === 200) {
      let session;
      try {
        let userSession = await getSessionService({
          user_id,
          contest_id: contest._id,
        });
        session = userSession.session;
        let now = +new Date();
        let end_date = +session.ends_at;
        if (now > end_date) {
          return res.status(403).send({ message: "Your session was expired." });
        }
      } catch (err) {
        if (err.status === 404) {
          let userSession = await createSessionService({
            user_id,
            contest_id: contest._id,
          });
          session = userSession.newSession;
        } else throw err;
      }
      response.session = session;
    }
    let contestQuizzes = await getAllQuizzesWithContestId(contest._id);
    response.quizzes = contestQuizzes.quizzes;
    let ContestChallenges = await getAllChallengesWithContestId(contest._id);
    response.challenges = ContestChallenges.challenges;
    return res
      .status(status)
      .send({ contest: response, message: "Your session is started." });
  } catch ({ status, message }) {
    console.log(message);
    return res.status(status).send(message);
  }
};
const updateContest = async (req, res) => {
  let updateDetails = req.body;
  try {
    let { status, message } = await updateContestService(updateDetails);
    res.status(status).send({ message });
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};
const deleteContest = async (req, res) => {
  const contest = req.body;
  try {
    //Checking if contest already exist or softly deleted
    let exist_contest = await Contest.findOne({
      name: contest.name,
      deleted_at: null,
    });
    if (!exist_contest)
      return res.status(404).json({
        message: `No contest available to delete with name ${contest.name}`,
        success: false,
      });
    //TODO : Have to remove all question related to this contest
    //Softly deleted by modified deleted_at time
    await Contest.findOneAndUpdate(
      {
        name: contest.name,
        deleted_at: null,
      },
      { deleted_at: new Date() },
      { new: true }
    );
    return res.status(200).json({
      message: `Contest with name ${contest.name} deleted successfully`,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Unable to delete a contest with name ${contest.name}`,
      success: false,
    });
  }
};
const getAllContests = async (req, res) => {
  const { page = 1, limit = 10, past } = req.query;
  try {
    // let { code, message } = await getAllContestService(page, limit);
    let { status, message } = await getAllContestWithFilter(
      req.user._id,
      page,
      limit,
      past
    );
    res.status(status).send({ message });
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};

module.exports = {
  createContest,
  updateContest,
  getContest,
  getAllContests,
  deleteContest,
  getContestForDashboard,
};
