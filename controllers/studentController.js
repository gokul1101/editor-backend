const Student = require("../models/Student");
const studentLogin = async (req, res) => {
  let { regno, password } = req.body;
  let stud = await Student.findOne({ regno }).exec();
  

};

module.exports = {
  studentLogin,
};
