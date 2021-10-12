const User = require("../models/User");
const studentLogin = async (req, res) => {
  let { regno, password } = req.body;
  try {
    let user = await User.findOne({ regno }).exec();
    if (!user || user.role === "student")
      res.status(404).send({ message: "Student not found" });
    else if (user.password === password)
      res.status(401).send({ message: "incorrect password" });
    else res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  studentLogin,
};
