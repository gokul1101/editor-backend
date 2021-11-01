const common = ["getUser", "updateUser", "getAllContests", "getContest", "compiler"];
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
];

module.exports = {
  API: { common, student, admin },
};
