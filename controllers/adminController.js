const Admin = require("../models/Student");
const adminLogin = async (req, res) => {
  let { email, password } = req.body;
  let admin = await Admin.findOne({ email }).exec();
  

};

module.exports = {
    adminLogin,
};
