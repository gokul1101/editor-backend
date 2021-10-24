const common = ["getUser", "updateUser"];
const student = [...common];
const admin = [
  ...common,
  "createUser",
  "deteleUser",
  "createAllUsers",
  "getAllUsers",
  "updateAllUsers",
  "deleteAllUsers",
  "createContest",
  "getContest",
  "updateContest",
  "deleteContest"
];

module.exports = {
  API: { common, student, admin },
};
