const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require("../utils/Auth");

const router = require("express").Router();
//* User registration
router.post("/api/v1/register-user", async (req, res) => {
    await userRegister(req.body, res);
})
//* Student Login
router.post("/api/v1/login-student", async (req, res) => {
    await userLogin(req.body, "student", res);
})
//* Admin Login
router.post("/api/v1/login-admin", async (req, res) => {
    await userLogin(req.body, "admin", res);
})
//* Student dashboard
router.get("/api/v1/student-protected", userAuth, checkRole(['student']), async (req, res) => {
    return res.json(serializeUser(req.user))
})
//* Admin dashboard
router.get("/api/v1/admin-protected", userAuth, checkRole(['admin']), async (req, res) => {
    return res.json(serializeUser(req.user))
})

module.exports = router;
