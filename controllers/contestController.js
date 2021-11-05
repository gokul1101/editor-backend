const { success, error } = require("consola");
const { UUID } = require("../utils/helper");
const Contest = require("../models/contests");
const { mapUserId } = require("../utils/helper");
const createContest = async (req, res) => {
  const contest = req.body;
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
    //Creating new contest with given details
    else {
      const uuid = UUID().split("-");
      contest.code = uuid[uuid.length - 1];
      //Can we handle particular for username existing mistake
      contest.created_by = await mapUserId(contest.created_by);
      //start -> Have to remove in future
      if (contest.start_date) contest.start_date = new Date(contest.start_date);
      if (contest.end_date) contest.end_date = new Date(contest.end_date);
      //** <- end*/
      const new_contest = new Contest(contest);
      const create_contest = await new_contest.save();
      success({
        message: ` contest created as ${create_contest}`,
      });
      res
        .status(200)
        .json({ message: "Contest created successfully", success: true });
    }
  } catch (err) {
    error({
      message: `Unable to create contest \n${err}`,
      badge: true,
    });
    return res
      .status(500)
      .json({ message: "Can't create contest", success: false });
  }
};
const getContest = async (req, res) => {
  const contest = req.body;
  try {
    //If contest already exist return success otherwise not found
    const exist_contest = await Contest.findOne({
      name: contest.name,
      deleted_at: null,
    });
    if (!exist_contest)
      return res.status(400).json({
        message: `Contest with given name ${contest.name} is not available`,
        success: false,
      });
    res.status(200).json({ message: exist_contest, success: true });
  } catch (err) {
    error({
      message: `Unable to find contest \n${err}`,
      badge: true,
    });
    return res
      .status(500)
      .json({ message: "Unable to find contest", success: false });
  }
};
const getAllContests = async (req, res) => {
  try {
    //get all contest and return , return nothing if nothing
    const exist_contests = await Contest.find({ deleted_at: null });
    if (!exist_contests)
      return res
        .status(400)
        .json({ message: "No contest available", success: false });
    res.status(200).json({ message: exist_contests, success: true });
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
const updateContest = async (req, res) => {
  const contest = req.body;
  //name will be ok ?
  const { oldname, newname } = contest;
  delete contest["oldname"];
  delete contest["newname"];
  if (contest.start_date) contest.start_date = new Date(contest.start_date);
  if (contest.end_date) contest.end_date = new Date(contest.end_date);
  console.log(contest);
  try {
    const exist_contest = await Contest.findOne({
      name: oldname,
      deleted_at: null,
    });
    //Checking contest is available or softly deleted
    if (!exist_contest)
      return res.status(404).json({
        message: `No contest available to update with name ${oldname}`,
        success: false,
      });
    //If name of contest need to be changed check newname is already taken
    const contestWithNewTitle = await Contest.findOne({
      name: newname,
      deleted_at: null,
    });
    if (
      contestWithNewTitle &&
      JSON.stringify(contestWithNewTitle._id) !==
        JSON.stringify(exist_contest._id)
    )
      return res.status(403).json({
        message: `Contest name ${newname} already taken`,
        success: false,
      });

    // I think it's an option condition do we need ?
    // else if (exist_contest && !exist_contest.deleted_at) {
    //updating new contest details
    const updated_contest = await Contest.findOneAndUpdate(
      {
        name: exist_contest.name,
        deleted_at: null,
      },
      { ...contest, update_at: new Date(), name: newname },
      { new: true }
    );
    console.log(updated_contest);
    res.status(201).json({ message: updated_contest, success: true });
    // }
  } catch (err) {
    error({
      message: `Unable to update contest with name ${oldname} \n${err}`,
      badge: true,
    });
    return res.status(500).json({
      message: `Unable to update a contest with name ${oldname}`,
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

module.exports = {
  createContest,
  updateContest,
  getContest,
  getAllContests,
  deleteContest,
};
