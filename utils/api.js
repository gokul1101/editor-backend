const common = ["getUser", "updateUser"];
const student = [...common];
const admin = [
  ...common,
  "createUser",
  "deteleUser",
  "createBulkUsers",
  "getAllUsers",
  "createContest",
  "getContest",
  "updateContest",
  "deleteContest"
];

module.exports = {
  API: { common, student, admin },
};
