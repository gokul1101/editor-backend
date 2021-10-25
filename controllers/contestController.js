const { success, error } = require("consola");
const Contest = require("../models/contests");
const { mapUserId } = require("../utils/helper");
const createContest = async (req, res) => {
  const contest = req.body;
  try {
    //Can we write it as reusable
    //Checking for code and name of contest was already taken
    let exist_contest = await Contest.findOne({ code: contest.code });
    if (exist_contest) {
      if (exist_contest.name === contest.name)
        return res
          .status(400)
          .json({ message: "Contest code and title already taken" });
      return res.status(400).json({ message: "Contest code already taken" });
    }
    //Checking for name of contest was already taken
    exist_contest = await Contest.findOne({ name: contest.name });
    if (exist_contest && exist_contest.name === contest.name)
      return res.status(400).json({ message: "Contest name already taken" });
    //Creating new contest with given details
    else {
      contest.created_by = await mapUserId(contest.create_by);
      //start -> Have to remove in future
      contest.start_date = new Date();
      contest.end_date = new Date();
      //** <- end*/
      const new_contest = new Contest(contest);
      const create_contest = await new_contest.save();
      success({
        message: ` contest created as ${create_contest}`,
      });
      res.status(200).json({ message: "Contest created successfully" });
    }
  } catch (err) {
    error({
      message: `Unable to create contest \n${err}`,
      badge: true,
    });
    return res.status(500).json({ message: "Can't create contest" });
  }
};

const getContest = async (req, res) => {
  const contest = req.body;
  console.log(contest);
  try {
    const exist_contest = await Contest.findOne({ code: contest.code });
    if (!exist_contest)
      return res.status(400).json({
        message: `Contest with given name ${contest.code} is not available`,
      });
    res.status(200).json({ message: exist_contest });
  } catch (err) {
    error({
      message: `Unable to find contest \n${err}`,
      badge: true,
    });
    return res.status(500).json({ message: "Unable to find contest" });
  }
};
const getAllContests = async (req, res) => {
  try {
    const exist_contests = await Contest.find();
    if (!exist_contests)
      return res.status(400).json({ message: "No contest available" });
    res.status(200).json({ message: exist_contests });
  } catch (err) {
    error({
      message: `Unable to find any contests \n${err}`,
      badge: true,
    });
    return res.status(500).json({ message: "Unable to find any contests" });
  }
};
const updateContest = async (req, res) => {
  
};
const deleteContest = async (req, res) => {};

module.exports = {
  createContest,
  updateContest,
  getContest,
  getAllContests,
  deleteContest,
};
