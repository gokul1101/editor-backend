const common = [
  "getUser",
  "updateUser",
  "getContest",
  "getContestForDashboard",
  "getAllContests",
  "getQuiz",
  "getAllQuizzes",
  "getQuestion",
  "getAllMCQS",
  "getAllChallenges",
  "createSubmission",
  "compiler",
  "getTestCases",
  "executeContestChallenge",
  "getSubmission"
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
  "deleteQuestion",
  "errorLogs",
  "deleteTestCase",
  "deleteQuiz",
  "exportSubmissions",
  "exportUsers",
  "adminDashboard"
];

module.exports = {
  API: {student, admin },
};
