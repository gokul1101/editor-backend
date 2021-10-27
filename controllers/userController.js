const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { serializeUser } = require("../utils/Auth");
let {
  validate,
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
    let registerNumberNotTaken = await validate({
      regno: userDetails.regno,
    });
    if (!registerNumberNotTaken) {
      return res.status(403).json({
        message: `Register number already exists.`,
        success: false,
      });
    }
    //* Validate email
    let emailNotTaken = await validate({ email: userDetails.email });
    if (!emailNotTaken) {
      return res.status(403).json({
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
    let user = await User.findOne({ regno: req.params.id }).populate([
      {
        path: "role_id",
        model: "role",
        select: "name",
      },
      {
        path: "gender_id",
        model: "gender",
        select: "name",
      },
      {
        path: "stream_id",
        model: "stream",
        select: "name",
      },
      {
        path: "course_id",
        model: "course",
        select: "name",
      },
      {
        path: "college_id",
        model: "college",
        select: "name",
      },
      {
        path: "batch_id",
        model: "batch",
        select: "start_year end_year",
      },
    ]);
    //! User not found
    if (!user || user.deleted_at)
      return res.status(404).json({
        message: `user not found`,
        success: false,
      });
    let userDetails = serializeUser(user);
    //! Student cannot access admin data
    if (req.user.role === "student" && userDetails.role_id === "admin")
      return res.status(401).json({
        message: `Unauthorized access`,
        success: false,
      });
    res.status(200).json(userDetails);
  } catch (err) {
    //! Error in finding user details
    console.log(err);
    res.status(500).json({
      message: `unable to find user details`,
      success: false,
    });
  }
};
const updateUser = async (req, res) => {
  let updateDetails = req.body;
  try {
    let user = await User.findById(updateDetails._id).populate([
      {
        path: "role_id",
        model: "role",
        select: "name",
      },
      {
        path: "gender_id",
        model: "gender",
        select: "name",
      },
      {
        path: "stream_id",
        model: "stream",
        select: "name",
      },
      {
        path: "course_id",
        model: "course",
        select: "name",
      },
      {
        path: "college_id",
        model: "college",
        select: "name",
      },
      {
        path: "batch_id",
        model: "batch",
        select: "start_year end_year",
      },
    ]);
    //! User not found
    if (!user || user.deleted_at)
      return res.status(404).json({
        message: `user not found`,
        success: false,
      });
    //* Validate register number
    if (updateDetails.regno) {
      let registerNumberNotTaken = await validate({
        regno: updateDetails.regno,
      });
      if (!registerNumberNotTaken)
        return res.status(403).json({
          message: `Register number already exists.`,
          success: false,
        });
    }
    //* Validate email
    if (updateDetails.email) {
      let emailNotTaken = await validate({ email: updateDetails.email });
      if (!emailNotTaken)
        return res.status(403).json({
          message: `Email already exists.`,
          success: false,
        });
    }
    //! Student cannot access admin data
    if (req.user.role === "student" && user.role.name === "admin")
      return res.status(401).json({
        message: `Unauthorized access`,
        success: false,
      });
    let userDetails = {};
    //* Only admins can change these data
    if (req.user.role === "admin") {
      if (updateDetails.newPassword) {
        let hashedPassword = await bcrypt.hash(updateDetails.newPassword, 8);
        userDetails.password = hashedPassword;
      }
      if (updateDetails.regno) userDetails.regno = updateDetails.regno;
      if (updateDetails.role)
        userDetails.role_id = await mapRoleId(updateDetails.role);
    }
    if (updateDetails.name) userDetails.name = updateDetails.name;
    if (updateDetails.phone_no) userDetails.phone_no = updateDetails.phone_no;
    if (updateDetails.gender)
      userDetails.gender_id = await mapGenderId(updateDetails.gender);
    if (updateDetails.stream)
      userDetails.stream_id = await mapStreamId(updateDetails.stream);
    if (updateDetails.college)
      userDetails.college_id = await mapCollegeId(updateDetails.college);
    if (updateDetails.course)
      userDetails.course_id = await mapCourseId(updateDetails.course);
    if (updateDetails.batch)
      userDetails.batch_id = await mapBatchId(updateDetails.batch);
    await User.findByIdAndUpdate(user._id, userDetails);
    res.status(200).json(userDetails);
  } catch (err) {
    //! Error in finding user details
    console.log(err);
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
