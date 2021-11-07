const common = [
  "getUser",
  "updateUser",
  "getAllContests",
  "getContest",
  "compiler",
  "getQuestion",
  "getAllQuestions",
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
];

module.exports = {
  API: { common, student, admin },
};
