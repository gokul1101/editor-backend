const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { serializeUser } = require("../utils/Auth");
let {
  validateEmail,
  validateRegisterNumber,
  mapBatchId,
  mapCollegeId,
  mapCourseId,
  mapGenderId,
  mapRoleId,
  mapStreamId,
} = require("../utils/helper");
//? To register the User
const createUser = async (req, res) => {
  let userDetails = req.body;
  try {
    //* Validate register number
    let registerNumberNotTaken = await validateRegisterNumber(
      userDetails.regno
    );
    if (!registerNumberNotTaken) {
      res.status(400).json({
        message: `Register number already exists.`,
        success: false,
      });
    }
    //* Validate email
    let emailNotTaken = await validateEmail(userDetails.email);
    if (!emailNotTaken) {
      res.status(400).json({
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
    if (userDetails.batch_id)
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
    res.status(500).json({
      message: `unable to create user`,
      success: false,
    });
  }
};
const getUser = async (req, res) => {
  try {
    let user = await User.findOne({regno : req.params.id});
    //! User not found
    if (!user || user.deleted_at)
      return res.status(404).json({
        message: `user not found`,
        success: false,
      });
    let userDetails = await serializeUser(user);
    if (req.user.role === "student" && userDetails.role === "admin")
      return res.status(401).json({
        message: `Unauthorized access`,
        success: false,
      });
    res.status(200).json(userDetails);
  } catch (err) {
    //! Error in finding user details
    console.log(err)
    res.status(500).json({
      message: `unable to find user details`,
      success: false,
    });
  }
};
const updateUser = async (req, res) => {
  let { data } = req.body;
  let user = req.user._doc;
  if (req.user.role === "student")
    try {
      res.status(200).json(await serializeUser(user));
    } catch (err) {
      //! Error in finding user details
      res.status(500).json({
        message: `unable to find user details`,
        success: false,
      });
    }
};
const deteleUser = async (req, res) => {};
const createAllUsers = async (req, res) => {};
const getAllUsers = async (req, res) => {};
const updateAllUsers = async (req, res) => {};
const deleteAllUsers = async (req, res) => {};
module.exports = {
  createUser,
  getUser,
  updateUser,
  deteleUser,
  createAllUsers,
  getAllUsers,
  updateAllUsers,
  deleteAllUsers,
};
