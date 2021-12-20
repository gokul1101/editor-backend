const {
  createMultipleTestCasesService,
  updateTestCaseService,
  getTestCasesService,
  createTestCaseService
} = require("../services/testcaseService");

const createMultipleTestCases = async (req, res) => {
  try {
    const response = await createTestCaseService(req.body);
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.status(500).json({ message: "Internal server error" });
  }
};
const getTestCases = async (req, res) => {
  try {
    const {id} = req.query
    const {code, message, testcases} = await getTestCasesService(id, req.user.role);
    res.status(code).json({ message, testcases });
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
