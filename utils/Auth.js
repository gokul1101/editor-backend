const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { SECRET } = require("../config/index");
const User = require("../models/users");
const Role = require("../models/roles");
//* Helper Function
let {
  validateEmail,
  validateRegisterNumber,
  mapBatchId,
  mapCollegeId,
  mapCourseId,
  mapGenderId,
  mapRoleId,
  mapStreamId,
  mapGenderName,
  mapStreamName,
  mapBatchYear,
  mapCourseName,
  mapCollegeName,
} = require("./helper");

//? To register the User
const userRegister = async (userDetails, res) => {
  try {
    //* Validate register number
    let registerNumberNotTaken = await validateRegisterNumber(
      userDetails.regno
    );
    if (!registerNumberNotTaken) {
      return res.status(400).json({
        message: `Register number already exists.`,
        success: false,
      });
    }
    //* Validate email
    let emailNotTaken = await validateEmail(userDetails.email);
    if (!emailNotTaken) {
      return res.status(400).json({
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
    res.status(201).json({
      message: "New User Created",
      success: true,
    });
  } catch (err) {
    //! Error in creating user
    console.log(err);
    return res.status(500).json({
      message: `unable to create user`,
      success: false,
    });
  }
};
//? User Login
const userLogin = async (userCred, res) => {
  let { regno, password } = userCred;
  //? Check if the regno is in the DB
  const user = await User.findOne({ regno });
  if (!user) {
    //! Register Number not found
    return res.status(404).json({
      message: "Register number not found!",
      success: false,
    });
  }
  const role = await Role.findById(user.role_id);
  //? If user exists
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: role.name,
        regno: user.regno,
        email: user.email,
      },
      SECRET,
      { expiresIn: "3h" }
    );
    let result = {
      username: user.name,
      role: role.name,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 3,
    };
    return res.status(200).json({
      ...result,
      message: "You are logged in!",
      success: true,
    });
  } else {
    //! Wrong password
    return res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};
//? Passport Middleware
const userAuth = passport.authenticate("jwt", { session: false });
 
const routeAuth = (role) => (req, res, next) => {
  (role === req.user.role)? next() : res.status(401).json("Unauthorized");
}

const serializeUser = async (user) => {
  return {
    _id: user._id,
    regno: user.regno,
    name: user.name,
    email: user.email,
    role: user.role_id,
    gender: await mapGenderName(user.gender_id),
    stream: await mapStreamName(user.stream_id),
    batch: await mapBatchYear(user.batch_id),
    college: await mapCollegeName(user.college_id),
    course: await mapCourseName(user.course_id),
    phone_no: user.phone_no,
  };
};

module.exports = {
  userAuth,
  userRegister,
  userLogin,
  serializeUser,
  routeAuth,
};
