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
const compiler = require("../services/compilerService");
const {
  createQuiz,
  getQuiz,
  updateQuiz,
  getAllQuizzes,
} = require("../controllers/quizController");

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
  userAuth,
  routeAuth("createUser"),
  createUser
);

//* User Details
router.get("/api/v1/user/get/:id", userAuth, routeAuth("getUser"), getUser);

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
router.post(
  "/api/v1/contest/get",
  userAuth,
  routeAuth("getContest"),
  getContest
);
router.post(
  "/api/v1/contest/getAll",
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
router.get("/api/v1/quiz/get/:id", userAuth, routeAuth("getQuiz"), getQuiz);
router.post(
  "/api/v1/quiz/update",
  userAuth,
  routeAuth("updateQuiz"),
  updateQuiz
);
router.post(
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
router.post(
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
router.post(
  "/api/v1/question/all/mcqs",
  userAuth,
  routeAuth("getAllMCQS"),
  getAllMCQS
);
router.post(
  "/api/v1/question/all/challenges",
  userAuth,
  routeAuth("getAllChallenges"),
  getAllChallenges
);

//* ==============Compiler===============
router.post("/api/v1/compiler", userAuth, routeAuth("compiler"), compiler);

module.exports = router;
