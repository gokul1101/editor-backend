const { userRegister, userLogin, userAuth, serializeUser, routeAuth } = require("../utils/Auth");

const router = require("express").Router();
//? Public Routes
//* Login
router.post("/api/v1/login", async (req, res) => {
    await userLogin(req.body, res);
})

//? Private Routes
//* User registration
router.post("/api/v1/register-user", async (req, res) => {
    await userRegister(req.body, res);
})
// router.get("/api/v1/student-protected", userAuth, routeAuth("student"), async (req, res) => {
//     return res.json(await serializeUser(req.user._doc))
// })
// router.get("/api/v1/admin-protected", userAuth, routeAuth("admin"), async (req, res) => {
//     return res.json(await serializeUser(req.user._doc))
// })
module.exports = router;
