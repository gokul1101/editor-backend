const {
  createTestCaseService,
  createMultipleTestCasesService,
  updateTestCaseService,
} = require("../services/testcaseService");

const createMultipleTestCases = async (req, res) => {
  try {
    console.log(req.body);
    const response = await createMultipleTestCasesService(req.body);
    res.status(response.code).json({ message: response.message });
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
    console.log(err);
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.status(500).json({ message: "Unable to update testcase" });
  }
};

module.exports = { createMultipleTestCases, updateTestCase };
