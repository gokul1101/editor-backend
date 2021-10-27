const common = ["getUser", "updateUser", "getAllContests", "getContest"];
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
  "updateContest",
  "deleteContest",
];

module.exports = {
  API: { common, student, admin },
};
