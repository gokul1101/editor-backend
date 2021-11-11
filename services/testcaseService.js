const Answer = require("../models/answers");
const Question = require("../models/questions");
const createMultipleTestCasesService = async ({ question_id, testcase }) => {
  const { sample, hidden } = testcase;
  console.log(question_id, sample, hidden);
  if (!sample && !hidden) {
    return Promise.reject({ code: 400, message: "Invalid testcase found" });
  }
  try {
    const question = await Question.findById(question_id);
    if (!question) {
      return Promise.reject({
        code: 404,
        message: `Question with given id ${question_id} not found`,
      });
    } else {
      const new_testcase = new Answer({
        testcases: {
          sample,
          hidden,
          question_id,
        },
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
  let idx = 0;
  if (hidden) idx = 1;
  try {
    let updated_response = null;
    if (idx === 0) {
      updated_response = await Answer.findByIdAndUpdate(testcase_id, {
        $set: {
          "testcases.sample.1": sample,
        },
      });
    } else if (idx === 1) {
      updated_response = await Answer.findByIdAndUpdate(testcase_id, {
        $set: {
          "testcases.hidden.1": hidden,
        },
      });
    }
    console.log(updated_response);
    if (!updated_response || updated_response === null) {
      return Promise.reject({
        code: 404,
        message: `Testcase with id ${testcase_id} not found`,
      });
    } else {
      return Promise.resolve({
        code: 201,
        message: `Testcase with id ${testcase_id} update successfully`,
      });
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({ code: 500, message: "Unable to update testcase" });
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
};
