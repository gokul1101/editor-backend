const router = require("express").Router();
const { studentLogin } = require("../controllers/studentController");
router.post("/student-login", studentLogin);

module.exports = router;
