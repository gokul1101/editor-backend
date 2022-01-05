const { getErrorLogsService } = require("../services/errorLogsService");

const getErrorLogs = async (req, res) => {
  const {created_by} = req.query;
  try {
    const response = await getErrorLogsService(created_by,req.user._id);
    res.status(response.status).json(response);
  } catch ({ status, message }) {
    res.status(status).send(message);
  }
};

module.exports = { getErrorLogs };
