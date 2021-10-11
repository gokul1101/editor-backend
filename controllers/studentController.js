const studentLogin = (req, res) => {
  let { regno, password } = req.body;
  // let stud = await Student.findOne({ regno }).exec();
  res.status(200).send({regno, password})
};

module.exports = {
  studentLogin,
};
