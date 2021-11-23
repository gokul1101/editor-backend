const { success, error } = require("consola");
const { getDuration, UUID } = require("../utils/helper");
const Contest = require("../models/contests");
const createContest = async (req, res) => {
  let contest = req.body;
  try {
    //Can we write it as reusable
    //Checking for name of contest was already taken
    const exist_contest = await Contest.findOne({
      name: contest.name,
      deleted_at: null,
    });
    if (exist_contest)
      return res
        .status(403)
        .json({ message: "Contest name already taken", success: false });
    //* Creating new contest with given details
    else {
      const uuid = UUID().split("-").pop();
      contest.code = uuid.substr(uuid.length - 6, 6).toUpperCase();
      //* Start datetime & End datetime of the contest
      let start = new Date(contest.start_date + " " + contest.start_time);
      let end = new Date(contest.end_date + " " + contest.end_time);
      contest.start_date = start;
      contest.end_date = end;
      //* Calculating duration
      contest.duration = getDuration(start, end);
      //** <- end*/
      const newContest = new Contest(contest);
      await newContest.save();
      success({
        message: ` contest created.`,
      });
      res
        .status(201)
        .json({ message: "Contest created successfully", success: true });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Can't create contest", success: false });
  }
};
const getContest = async (req, res) => {
  const { id, code } = req.query;
  try {
    //If contest already exist return success otherwise not found
    let contest;
    if (req.user.role === "admin") contest = await Contest.findById(id);
    else if (req.user.role === "student")
      contest = await Contest.findOne({ code });
    if (!contest) return res.status(404).send(`Contest not found`);
    if (req.user.role === "student") {
      let now = +new Date();
      let end_date = +contest.end_date;
      let start_date = +contest.start_date;
      //* If the contest was already ended.
      if (now > end_date)
        return res.status(403).send(`The contest was expired.`);
      //* If the contest is not started yet.
      if (now < start_date)
        return res.status(403).send(`The contest is not started yet.`);
    }
    res.status(200).json({ message: contest });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to find contest" });
  }
};
const updateContest = async (req, res) => {
  let updateDetails = req.body;
  let { id, name, start_date, end_date, start_time, end_time } = updateDetails;
  try {
    let contest = await Contest.findById(id);
    if (!contest)
      return res.status(404).json({
        message: `Contest not found!!!`
      });
    if (name) {
      let contestNameExists = await Contest.findOne({ name });
      if (contestNameExists)
        return res.status(403).send(`Contest name ${name} already taken`);
      contest.name = name;
    }
    if (start_time) contest.start_time = start_time;
    if (!start_date) {
      let date = contest.start_date;
      start_date = `${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}`;
    }
    contest.start_date = new Date(start_date + " " + contest.start_time);

    if (end_time) contest.end_time = end_time;
    if (!end_date) {
      let date = contest.end_date;
      end_date = `${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}`;
    }
    contest.end_date = new Date(end_date + " " + contest.end_time);

    //* Calculating duration
    contest.duration = getDuration(contest.start_date, contest.end_date);
    await contest.save();
    res.status(200).send("Contest updated.");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Unable to update a contest.`,
      success: false,
    });
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
    let response = {};
    const count = await Contest.countDocuments();
    response.modelCount = count;
    //get all contest and return , return nothing if nothing
    const contests = await Contest.find({ deleted_at: null })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    response.total = contests.length;
    response.contests = contests;
    res.status(200).json(response);
  } catch (err) {
    error({
      message: `Unable to find any contests \n${err}`,
      badge: true,
    });
    return res
      .status(500)
      .json({ message: "Unable to find any contests", success: false });
  }
};
module.exports = {
  createContest,
  updateContest,
  getContest,
  getAllContests,
  deleteContest,
};
