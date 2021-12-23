const {
  createMultipleTestCasesService,
  updateTestCaseService,
  getTestCasesService,
  createTestCaseService,
  deleteTestCaseService,
} = require("../services/testcaseService");

const createMultipleTestCases = async (req, res) => {
  try {
    const response = await createTestCaseService(req.body);
    console.log(response)
    //TODO : possible to send added testcases
    res.status(response.code).json({ message: response.message,testcase_id:response.testcase_id });
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
    const { code, message, testcases } = await getTestCasesService(
      id,
      req.user.role_id
    );
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
    console.log(err)
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.status(500).json({ message: "Unable to update testcase" });
  }
};
const deleteTestCase = async (req,res) => {
  try{
    const response = await deleteTestCaseService(req.body)
    return res.status(response.code).json({message:response.message})
  }catch(err){
    if(!err.code){
      err.code = 500;
      err.message = `Internal server error`
    }
    return res.status(err.code).send(err.message)
  }
} 

module.exports = { createMultipleTestCases, updateTestCase, getTestCases,deleteTestCase};
