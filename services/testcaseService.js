const Answer = require("../models/answers");
const Question = require("../models/questions");
const createMultipleTestCasesService = async ({ question_id, testcase }) => {
  const { sample, hidden } = testcase;
  if (!sample && !hidden)
    return Promise.reject({ code: 406, message: "Testcases not found" });
  try {
    const question = await Question.findById(question_id);
    if (!question) {
      return Promise.reject({
        code: 404,
        message: `Question not found`,
      });
    } else {
      let testcases = {};
      if (sample) testcases.sample = sample;
      if (hidden) testcases.hidden = hidden;
      const new_testcase = new Answer({
        question_id,
        testcases,
      });
      await new_testcase.save();
      return Promise.reject({
        code: 201,
        message: "Testcase created successfully",
      });
    }
  } catch (err) {
    return Promise.reject({ code: 500, message: "Unable to create testcase" });
  }
};
const createTestCaseService = async ({ testcase_id, testcase }) => {
  let idx = 0;
  const { sample, hidden } = testcase;
  const input = ["sample", "hidden"];
  if (hidden) idx = 1;
  try {
    await Answer.findByIdAndUpdate(testcase_id, {
      $push: {
        testcases: {},
      },
    });
  } catch (err) {
    return Promise.reject({ code: 500, message: "Unable to create testcases" });
  }
};
const updateTestCaseService = async ({ testcase_id, index, testcase }) => {
  const { sample, hidden } = testcase;
  if (!index && !sample && !hidden) {
    //Not sure about err code
    return Promise.reject({
      code: 403,
      message: "Invalid parameters for updating testcase",
    });
  }
  try {
    let idx = 0;
    const input = ["sample", "hidden"];
    if (hidden) idx = 1;
    //Fetching all testcases
    const exist_testcases = await Answer.findById(testcase_id);
    if (!exist_testcases) {
      return Promise.reject({
        code: 404,
        message: `Testcase with id ${testcase_id} not found`,
      });
    } else {
      //updating in array

      exist_testcases["testcases"][input[idx]][index] = testcase[input[idx]];

      const updated_result = await Answer.findByIdAndUpdate(testcase_id, {
        $set: {
          testcases: exist_testcases["testcases"],
        },
      });
      if (!updated_result) {
        return Promise.reject({
          code: 403,
          message: `Error in updating testcase`,
        });
      } else {
        return Promise.resolve({
          code: 201,
          message: `Testcase update successfully`,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({ code: 500, message: "Unable to update testcase" });
  }
};
const getTestCasesService = async (question_id) => {
  try {
    const testcases = await Answer.findOne({ question_id });
    if (testcases) {
      return Promise.resolve({
        code: 200,
        message: `testcases found`,
        testcases,
      });
    } else {
      return Promise.resolve({
        code: 404,
        message: "No testcases found",
      });
    }
  } catch (err) {
    return Promise.reject({ code: 500, message: "Unable to get testcases" });
  }
};
const deleteTestCaseService = async () => {
  try {
  } catch (err) {
    return Promise.reject({ code: 500, message: "Unable to delete testcase" });
  }
};
module.exports = {
  createTestCaseService,
  createMultipleTestCasesService,
  updateTestCaseService,
  deleteTestCaseService,
  getTestCasesService,
};
