const Contest = require("../models/contests");
const { getDuration, UUID } = require("../utils/helper");

const createContestService = async (contest) => {
  try {
    //Can we write it as reusable
    //Checking for name of contest was already taken
    const exist_contest = await Contest.findOne({
      name: contest.name,
      deleted_at: null,
    });
    if (exist_contest) {
      return Promise.reject({
        status: 403,
        message: "Contest name already taken",
      });
    }
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
      return Promise.resolve({
        code: 201,
        message: "Contest created successfully",
        contestCode : contest.code
      });
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: "Can't create contest",
    });
  }
};
const getContestService = async (id, code, role_id) => {
  try {
    //If contest already exist return success otherwise not found
    let contest;
    if (role_id === "admin") contest = await Contest.findById(id);
    else if (role_id === "student")
      contest = await Contest.findOne({ code });
    if (!contest) {
      return Promise.reject({
        status: 404,
        message: "Contest not found",
      });
    }
    if (role_id === "student") {
      let now = +new Date();
      let end_date = +contest.end_date;
      let start_date = +contest.start_date;
      //* If the contest was already ended.
      if (now > end_date) {
        return Promise.reject({
          status: 403,
          message: "The contest was expired.",
        });
      }
      //* If the contest is not started yet.
      if (now < start_date) {
        return Promise.reject({
          status: 403,
          message: "The contest is not started yet.",
        });
      }
    }
    return Promise.resolve({ 
      status: 200,
      contest,
    });
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "Unable to find contest.",
    });
  }
};
const updateContestService = async ({
  id,
  name,
  start_date,
  end_date,
  start_time,
  end_time,
}) => {
  try {
    let contest = await Contest.findById(id);
    if (!contest)
      return Promise.reject({
        status: 404,
        message: "Contest not found",
      });
    if (name) {
      let contestNameExists = await Contest.findOne({ name });
      if (contestNameExists)
        return Promise.reject({
          status: 403,
          message: `Contest name ${name} already taken`,
        });
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
    return Promise.resolve({
      code: 200,
      message: "Contest updated.",
    });
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "Unable to find contest.",
    });
  }
};
const getAllContestService = async (page, limit) => {
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
    return Promise.resolve({
      code: 200,
      message: response,
    });
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "Unable to find any contests",
    });
  }
};
module.exports = {
  createContestService,
  getContestService,
  updateContestService,
  getAllContestService,
};
