const User = require("../models/Users");
const adminLogin = (req, res) => {
  let { email, password } = req.body;
};
const createUser = async (req, res) => {
  let { regno } = req.body;
  let password = `ksrce@${regno}`;
  try{
    regno.forEach(data => {
      
    })
    const newUser = new User({ regno, password });
    await newUser.save()
    res.status(201).send(newUser)
  } catch(e) {
      res.status(500).send(e);
  }
  // try {
  //   let user = await User.findOne({ regno }).exec();
  //   if(user) res.status(403).send({ message: "Student already exists" });
  //   else {
  //   }
  // } catch(e) {
  // }
};
module.exports = {
  adminLogin,
  createUser,
};
