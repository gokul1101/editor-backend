const { success, error } = require("consola");
const { getDuration, UUID } = require("../utils/helper");
const Contest = require("../models/contests");
const { createContestService, updateContestService, getContestService } = require("../services/contestService");
const createContest = async (req, res) => {
  let contest = req.body;
  try {
    let { code, message } = await createContestService(contest);
    res.status(code).send({ message });
  } catch (err) {
    if(!err.code) {
      err.code = 500;
      err.message = `Internal server Error on getting session`;
    }
    res.status(err.code).send(err.message);
  }
};
const getContest = async (req, res) => {
  const { id, code } = req.query;
  try {
    let { status, message } = await getContestService(id, code, req.user.role_id);
    res.status(status).send({ message });
  } catch (err) {
    console.log(err)
    if(!err.status) {
      err.status = 500;
      err.message = `Internal server Error on getting session`;
    }
    res.status(err.status).send(err.message);
  }
};
const updateContest = async (req, res) => {
  let updateDetails = req.body;
  try {
    let { code, message } = await updateContestService(updateDetails);
    res.status(code).send({ message });
  } catch (err) {
    console.log(err);
    if(!err.code) {
      err.code = 500;
      err.message = `Internal server Error on getting session`;
    }
    res.status(err.code).send(err.message);
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
    error({
      message: `Unable to delete contest with name ${contest.name} \n${err}`,
      badge: true,
    });
    return res.status(500).json({
      message: `Unable to delete a contest with name ${contest.name}`,
      success: false,
    });
  }
};
const getAllContests = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let { code, message } = await updateContestService(page, limit);
    res.status(code).send({ message });
  } catch (err) {
    if(!err.code) {
      err.code = 500;
      err.message = `Internal server Error on getting session`;
    }
    res.status(err.code).send(err.message);
  }
};
module.exports = {
  createContest,
  updateContest,
  getContest,
  getAllContests,
  deleteContest,
};
