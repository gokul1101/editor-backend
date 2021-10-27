const bcrypt = require("bcryptjs");
const User = require("../models/users");
let {
  validate,
  mapBatchId,
  mapCollegeId,
  mapCourseId,
  mapGenderId,
  mapRoleId,
  mapStreamId,
} = require("../utils/helper");
const createUserService = async (userDetails) => {
  try {
    //* Validate register number
    let registerNumberNotTaken = await validate({
      regno: userDetails.regno,
    });
    if (!registerNumberNotTaken) {
      return Promise.resolve({
        code: 403,
        message: `Register number already exists.`,
      });
    }
    //* Get the hashed password
    if (!userDetails.password) {
      let suffix = "";
      if (userDetails.college_id === "KSR College of Engineering")
        suffix = "@ksrce";
      else if (userDetails.college_id === "KSR College of Technology")
        suffix = "@ksrct";
      else if (
        userDetails.college_id === "KSR Institute for Engineering & Technology"
      )
        suffix = "@ksriet";
      userDetails.password = `${userDetails.regno}${suffix}`;
    }
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
    return Promise.resolve({
      code: 201,
      message: `New user created.`,
      regno: userDetails.regno
    });
  } catch (err) {
    //! Error in creating user
    console.log(err);
    return Promise.reject({
      code: 500,
      message: `unable to create user`,
      regno: userDetails.regno
    });
  }
};
module.exports = {
  createUserService,
};
