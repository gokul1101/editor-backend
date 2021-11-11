const common = [
  "getUser",
  "updateUser",
  "getContest",
  "getAllContests",
  "getQuiz",
  "getAllQuizzes",
  "getQuestion",
  "getAllMCQS",
  "getAllChallenges",
  "compiler",
];
const student = [...common];
const admin = [
  ...common,
  "createUser",
  "deleteUser",
  "createBulkUsers",
  "getAllUsers",
  "createContest",
  "updateContest",
  "deleteContest",
  "createQuestion",
  "updateQuestion",
  "createQuiz",
  "updateQuiz",
  "createTestCase",
  "updateTestCase",
  "createMultipleTestCases",
];

module.exports = {
  API: { common, student, admin },
};
