const User = require("../models/users");
const bcrypt = require('bcryptjs');
//*Helper Function
let {
  validateEmail,
  validateRegisterNumber,
  mapBatchId,
  mapCollegeId,
  mapCourseId,
  mapGenderId,
  mapRoleId,
  mapStreamId,
} = require("./helper");

//? To register the User
const userRegister = async (userDetails, res) => {
  try {
    //* Validate register number
    let registerNumberNotTaken = await validateRegisterNumber(
      userDetails.regno
    );
    if (!registerNumberNotTaken) {
      return res.status(400).send({
        message: `Register number already exists.`,
        success: false,
      });
    }
    //* Validate email
    let emailNotTaken = await validateEmail(userDetails.email);
    if (!emailNotTaken) {
      return res.status(400).send({
        message: `Email already exists.`,
        success: false,
      });
    }
    //* Get the hashed password
    let hashedPassword = await bcrypt.hash(userDetails.password, 8);
    userDetails.password = hashedPassword;
    //* Map IDs
    userDetails.role_id = await mapRoleId(userDetails.role_id);
    userDetails.gender_id = await mapGenderId(userDetails.gender_id);
    userDetails.stream_id = await mapStreamId(userDetails.stream_id);
    userDetails.batch_id = await mapBatchId(userDetails.batch_id.split("-"));
    userDetails.course_id = await mapCourseId(userDetails.course_id);
    userDetails.college_id = await mapCollegeId(userDetails.college_id);
    //* Create new user
    const newUser = new User({ ...userDetails });
    await newUser.save();
    res.status(201).send({
      message: "New User Created",
      success: true,
    });
  } catch (err) {
    //! Error in creating user
    console.log(err)
    return res.status(500).send({
      message: `unable to create user`,
      success: false,
    });
  }
};

module.exports = { userRegister };
