const router = require("express").Router();
const { userLogin, userAuth, routeAuth } = require("../utils/Auth");
const {
  createUser,
  getUser,
  updateUser,
  deteleUser,
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

//? Public Routes
//* Login
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
  routeAuth("deteleUser"),
  deteleUser
);

//* Multiple user CRUD
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
//* Contest
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

//* Quiz
// router.post("api/v1/quiz/create", userAuth, routeAuth("createQuiz"), createQuiz)
// router.post("api/v1/quiz/get", userAuth, routeAuth("getQuiz"), getQuiz)
// router.post("api/v1/quiz/update", userAuth, routeAuth("updateQuiz"), updateQuiz)
// router.post("api/v1/quiz/delete", userAuth, routeAuth("deleteQuiz"), deleteQuiz)

//* Question
// router.post("api/v1/question/create", userAuth, routeAuth("createQuestion"), createQuestion)
// router.post("api/v1/question/get", userAuth, routeAuth("getQuestion"), getQuestion)
// router.post("api/v1/question/update", userAuth, routeAuth("updateQuestion"), updateQuestion)
// router.post("api/v1/question/delete", userAuth, routeAuth("deleteQuestion"), deleteQuestion)

//* Answer
// router.post("api/v1/answer/create", userAuth, routeAuth("createAnswer"), createAnswer)
// router.post("api/v1/answer/get", userAuth, routeAuth("getAnswer"), getAnswer)
// router.post("api/v1/answer/update", userAuth, routeAuth("updateAnswer"), updateAnswer)
// router.post("api/v1/answer/delete", userAuth, routeAuth("deleteAnswer"), deleteAnswer)

//* Batch
// router.post("api/v1/batch/create", userAuth, routeAuth("createBatch"), createBatch)
// router.post("api/v1/batch/get", userAuth, routeAuth("getBatch"), getBatch)
// router.post("api/v1/batch/update", userAuth, routeAuth("updateBatch"), updateBatch)
// router.post("api/v1/batch/delete", userAuth, routeAuth("deleteBatch"), deleteBatch)

//* Course
// router.post("api/v1/course/create", userAuth, routeAuth("createCourse"), createCourse)
// router.post("api/v1/course/get", userAuth, routeAuth("getCourse"), getCourse)
// router.post("api/v1/course/update", userAuth, routeAuth("updateCourse"), updateCourse)
// router.post("api/v1/course/delete", userAuth, routeAuth("deleteCourse"), deleteCourse)

//* Stream
// router.post("api/v1/stream/create", userAuth, routeAuth("createStream"), createStream)
// router.post("api/v1/stream/get", userAuth, routeAuth("getStream"), getStream)
// router.post("api/v1/stream/update", userAuth, routeAuth("updateStream"), updateStream)
// router.post("api/v1/stream/delete", userAuth, routeAuth("deleteStream"), deleteStream)

//* College
// router.post("api/v1/college/create", userAuth, routeAuth("createCollege"), createCollege)
// router.post("api/v1/college/get", userAuth, routeAuth("getCollege"), getCollege)
// router.post("api/v1/college/update", userAuth, routeAuth("updateCollege"), updateCollege)
// router.post("api/v1/college/delete", userAuth, routeAuth("deleteCollege"), deleteCollege)

module.exports = router;
