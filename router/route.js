const router = require("express").Router();
const { createUser } = require("../controllers/adminController");
const { studentLogin } = require("../controllers/studentController");
router.post("/student-login", studentLogin);
router.post("/create-user", createUser);

module.exports = router;
