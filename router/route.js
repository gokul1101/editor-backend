const router = require("express").Router();
const { userLogin, userAuth, routeAuth } = require("../utils/Auth");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createBulkUsers,
  getAllUsers,
} = require("../controllers/userController");
const {
  createContest,
  getContest,
  updateContest,
  deleteContest,
  getAllContests,
} = require("../controllers/contestController");
const {
  createQuestion,
  getQuestion,
  updateQuestion,
  getAllMCQS,
  getAllChallenges,
} = require("../controllers/questionController");
const {
  createQuiz,
  getQuiz,
  updateQuiz,
  getAllQuizzes,
} = require("../controllers/quizController");
const {
  createMultipleTestCases,
  updateTestCase,
} = require("../controllers/testcaseController");
const {compilerService} = require("../services/compilerService");
const { getErrorLogs } = require("../controllers/errorLogsController");
const { compile } = require("../controllers/compileController");

//? Public Routes
//* =============Login=============
router.post(
  "/api/v1/login",
  async (req, res) => await userLogin(req.body, res)
);

//? Private Routes
//* User registration
router.post(
  "/api/v1/user/create",
  // userAuth,
  // routeAuth("createUser"),
  createUser
);

//* User Details
router.get(
  "/api/v1/user/get",
  userAuth,
  routeAuth("getUser"),
  getUser
);

//* User Update
router.post(
  "/api/v1/user/update",
  userAuth,
  routeAuth("updateUser"),
  updateUser
);

//* User Delete
router.post(
  "/api/v1/user/delete/:id",
  userAuth,
  routeAuth("deleteUser"),
  deleteUser
);

//* ==============Multiple user CRUD================
router.post(
  "/api/v1/users/createAll",
  userAuth,
  routeAuth("createBulkUsers"),
  createBulkUsers
);
router.get(
  "/api/v1/users/getAll",
  userAuth,
  routeAuth("getAllUsers"),
  getAllUsers
);
//* =============Contest================
router.post(
  "/api/v1/contest/create",
  userAuth,
  routeAuth("createContest"),
  createContest
);
router.get(
  "/api/v1/contest/get",
  userAuth,
  routeAuth("getContest"),
  getContest
);
router.get(
  "/api/v1/contests/getAll",
  userAuth,
  routeAuth("getAllContests"),
  getAllContests
);
router.post(
  "/api/v1/contest/update",
  userAuth,
  routeAuth("updateContest"),
  updateContest
);
router.post(
  "/api/v1/contest/delete",
  userAuth,
  routeAuth("deleteContest"),
  deleteContest
);

//* ================Quiz================
router.post(
  "/api/v1/quiz/create",
  userAuth,
  routeAuth("createQuiz"),
  createQuiz
);
router.get("/api/v1/quiz/get", userAuth, routeAuth("getQuiz"), getQuiz);
router.post(
  "/api/v1/quiz/update",
  userAuth,
  routeAuth("updateQuiz"),
  updateQuiz
);
router.get(
  "/api/v1/quiz/all",
  userAuth,
  routeAuth("getAllQuizzes"),
  getAllQuizzes
);
//* ==============Question===============
router.post(
  "/api/v1/question/create",
  userAuth,
  routeAuth("createQuestion"),
  createQuestion
);
router.get(
  "/api/v1/question/get",
  userAuth,
  routeAuth("getQuestion"),
  getQuestion
);
router.post(
  "/api/v1/question/update",
  userAuth,
  routeAuth("updateQuestion"),
  updateQuestion
);
router.get(
  "/api/v1/mcq/all",
  userAuth,
  routeAuth("getAllMCQS"),
  getAllMCQS
);
router.post(
  "/api/v1/challenge/all",
  userAuth,
  routeAuth("getAllChallenges"),
  getAllChallenges
);
//* ==============Testcase==============*//
router.post(
  "/api/v1/testcase/create",
  userAuth,
  routeAuth("createMultipleTestCases"),
  createMultipleTestCases
);
router.post(
  "/api/v1/testcase/update",
  userAuth,
  routeAuth("updateTestCase"),
  updateTestCase
);
//* ==============Compiler===============*//
// router.post("/api/v1/compiler", userAuth, routeAuth("compiler"), compilerService);
router.post("/api/v1/compiler", userAuth, routeAuth("compiler"), compile);

//* =============== Error Logs =========== *//
router.get("/api/v1/errorLogs", userAuth, routeAuth("errorLogs"), getErrorLogs)
module.exports = router;
