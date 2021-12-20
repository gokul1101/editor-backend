const {
  createMultipleTestCasesService,
  updateTestCaseService,
  getTestCasesService,
  createTestCaseService,
} = require("../services/testcaseService");

const createMultipleTestCases = async (req, res) => {
  try {
    const response = await createTestCaseService(req.body);
    //TODO : possible to send added testcases
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
      err.message = "Internal server error";
    }
    res.status(err.code).json({ message: err.message });
  }
};
const getTestCases = async (req, res) => {
  try {
    const { id } = req.query;
    const { code, message, testcasesDetails } = await getTestCasesService(
      id,
      req.user.role
    );
    res.status(code).json({ message, testcasesDetails });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.status(500).json({ message: "Internal server error" });
  }
};
const updateTestCase = async (req, res) => {
  try {
    const response = await updateTestCaseService(req.body);
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.status(500).json({ message: "Unable to update testcase" });
  }
};

module.exports = { createMultipleTestCases, updateTestCase, getTestCases };
