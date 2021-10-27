const { success, error } = require("consola");
const { v4: uuidv4 } = require("uuid");
const Contest = require("../models/contests");
const { mapUserId } = require("../utils/helper");
const createContest = async (req, res) => {
  const contest = req.body;
  try {
    //Can we write it as reusable
    //Checking for name of contest was already taken
    const exist_contest = await Contest.findOne({ name: contest.name });
    if (exist_contest)
      return res.status(403).json({ message: "Contest name already taken" });
    //Creating new contest with given details
    else {
      console.log(uuidv4());
      const uuid = uuidv4().split("-");
      contest.code = uuid[uuid.length - 1];
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
  try {
    //If contest already exist return success otherwise not found
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
    //get all contest and return , return nothing if nothing
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
  const contest = req.body;
  try {
    const updated_contest = await Contest.findOneAndUpdate(
      {
        code: contest.code,
      },
      contest
    );
    console.log(updated_contest);
  } catch (err) {
    error({
      message: `Unable to update contest with code ${contest.code} \n${err}`,
      badge: true,
    });
    return res
      .status(500)
      .json({ message: `Unable to update a contest with id ${contest.id}}` });
  }
};
const deleteContest = async (req, res) => {
  const contest = req.body;
  try {
    //Return deleted as message otherwise not found
    //deletOne() return 1 if true else 0
    let deleted_contest = await Contest.deleteOne({ code: contest.code });
    if (!deleted_contest || +deleted_contest === 0)
      return res.status(404).json({ message: "No contest available" });
    //TODO : Have to remove all question related to this contest
    return res.status(200).json({
      message: `Contest with code ${contest.code} deleted successfully`,
    });
  } catch (err) {
    error({
      message: `Unable to delete contest with code ${contest.code} \n${err}`,
      badge: true,
    });
    return res
      .status(500)
      .json({ message: `Unable to delete a contest with id ${contest.id}}` });
  }
};

module.exports = {
  createContest,
  updateContest,
  getContest,
  getAllContests,
  deleteContest,
};
