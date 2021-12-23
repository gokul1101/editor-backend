const ErrorLogs = require("../models/errorLogs");

const getErrorLogsService = async (created_by, initiated_by) => {
  try {
    const errorLogs = await ErrorLogs.find({ created_by });
    console.log(created_by,initiated_by)
    if (""+created_by != initiated_by) {
      return Promise.reject({
        code: 401,
        message: "Unauthorized",
      });
    }
    return Promise.resolve({
      code: 200,
      message: "Error logs found!",
      errorLogs,
    });
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      message: "Unable to get error logs.",
    });
  }
};

module.exports = { getErrorLogsService };
