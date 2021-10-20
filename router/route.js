const { userRegister } = require("../utils/Auth");

const router = require("express").Router();
//* User registration
router.post("/api/v1/register-user", async (req, res) => {
    await userRegister(req.body, res);
})

module.exports = router;
