const {
  createTestCaseService,
  getTestCasesService,
  updateTestCaseService,
  deleteTestCaseService,
} = require("../services/testcaseService");
const { encryption } = require("../utils/crypto-js");

const createMultipleTestCases = async (req, res) => {
  let testcaseDetails = req.body;
  try {
    const { status, ...response } = await createTestCaseService(
      testcaseDetails
    );
    //TODO : possible to send added testcases
    return res.status(status).send(response);
  } catch ({ status, message }) {
    return res.status(status).json({ message });
  }
};
const getTestCases = async (req, res) => {
  try {
    const { id } = req.query;
    const { status, ...response } = await getTestCasesService(
      id,
      req.user.role_id
    );
    return res.status(status).send(response);
  } catch ({ status, message }) {
    return res.status(status).json({ message });
  }
};
const updateTestCase = async (req, res) => {
  let testcaseDetails = req.body;
  try {
    const { status, ...response } = await updateTestCaseService(
      testcaseDetails
    );
    return res.status(status).send(response);
  } catch ({ status, message }) {
    return res.status(status).json({ message });
  }
};
const deleteTestCase = async (req, res) => {
  let testcaseDetails = req.body;
  try {
    const { status, ...response } = await deleteTestCaseService(
      testcaseDetails
    );
    return res.status(status).send(response);
  } catch ({ status, message }) {
    return res.status(status).json({ message });
  }
};

module.exports = {
  createMultipleTestCases,
  updateTestCase,
  getTestCases,
  deleteTestCase,
};
