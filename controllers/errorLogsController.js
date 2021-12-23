const { getErrorLogsService } = require("../services/errorLogsService");

const getErrorLogs = async (req, res) => {
  const {created_by} = req.query;
  try {
    const response = await getErrorLogsService(created_by,req.user._id);
    res.status(response.code).json(response);
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
};

module.exports = { getErrorLogs };
