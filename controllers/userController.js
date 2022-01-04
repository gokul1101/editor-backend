const bcrypt = require("bcryptjs");
const fs = require("fs");
const { join } = require("path");
const xlsx = require("read-excel-file/node");
const User = require("../models/users");
const ErrorLogs = require("../models/errorLogs");
const { createUserService } = require("../services/userService");
const { serializeUser } = require("../utils/Auth");
let {
  validate,
  mapBatchId,
  mapCollegeId,
  mapCourseId,
  mapGenderId,
  mapRoleId,
  mapStreamId,
  UUID,
} = require("../utils/helper");
const Role = require("../models/roles");
//? To register the User
const createUser = async (req, res) => {
  let userDetails = req.body;
  try {
    let reponse = await createUserService(userDetails);
    return res.status(reponse.status).json(reponse);
  } catch (err) {
    //! Error in creating user
    return res.status(err.status).send(err.message);
  }
};
const getUser = async (req, res) => {
  let { user } = req;
  let userDetails = user;
  const { id, regno } = req.query;
  try {
    if (id || regno) {
      if (id) {
        user = await User.findById(id).populate([
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
      }
      if (regno) {
        user = await User.findOne({ regno }).populate([
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
      }
      if (user) userDetails = serializeUser(user);
    }
    //! User not found
    if (!user)
      return res.status(404).json({
        message: `user not found`,
        success: false,
      });
    //! Student cannot access admin data
    if (req.user.role_id === "student" && userDetails.role_id === "admin")
      return res.status(401).json({
        message: `Unauthorized access`,
        success: false,
      });
    res.status(200).json({
      userDetails,
      message: "User found",
      success: true,
    });
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
  let { id, updateDetails } = req.body;
  try {
    let user = await User.findById(id).populate([
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
      if (registerNumberNotTaken)
        return res.status(403).json({
          message: `Register number already exists.`,
          success: false,
        });
    }
    //* Validate email
    if (updateDetails.email) {
      let emailNotTaken = await validate({ email: updateDetails.email });
      if (emailNotTaken)
        return res.status(403).json({
          message: `Email already exists.`,
          success: false,
        });
    }
    //! Student cannot access admin data
    if (req.user.role_id === "student" && user.role.name === "admin")
      return res.status(401).json({
        message: `Unauthorized access`,
        success: false,
      });
    //* Only admins can change these data
    if (req.user.role_id === "admin") {
      if (updateDetails.regno) user.regno = updateDetails.regno;
      if (updateDetails.role)
        user.role_id = await mapRoleId(updateDetails.role);
    }
    if (updateDetails.password) {
      let hashedPassword = await bcrypt.hash(updateDetails.password, 8);
      user.password = hashedPassword;
    }
    if (updateDetails.name) user.name = updateDetails.name;
    if (updateDetails.phone_no) user.phone_no = updateDetails.phone_no;
    if (updateDetails.gender)
      user.gender_id = await mapGenderId(updateDetails.gender);
    if (updateDetails.stream)
      user.stream_id = await mapStreamId(updateDetails.stream);
    if (updateDetails.college)
      user.college_id = await mapCollegeId(updateDetails.college);
    if (updateDetails.course)
      user.course_id = await mapCourseId(updateDetails.course);
    if (updateDetails.batch)
      user.batch_id = await mapBatchId(updateDetails.batch);
    await user.save();
    res.status(200).json({
      message: "User updated",
      success: true,
    });
  } catch (err) {
    //! Error in finding user details
    console.log(err);
    res.status(500).json({
      message: `unable to find user details`,
      success: false,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    let user = await User.findOne({
      regno: req.params.id,
      deleted_at: null,
    }).populate({ path: "role_id", model: "role", select: "name" });
    //! User not found
    if (!user || user.deleted_at)
      return res.status(404).json({
        message: `user not found`,
        success: false,
      });
    //! Student cannot access admin data
    if (req.user.role_id === "student" && user.role_id.name === "admin")
      return res.status(401).json({
        message: `Unauthorized access`,
        success: false,
      });
    user.deleted_at = Date.now();
    user.depopulate();
    await user.save();
    res.status(204).json({
      message: "User deleted",
      success: true,
    });
  } catch (err) {
    //! Error in finding user details
    console.log(err);
    res.status(500).json({
      message: `unable to find user details`,
      success: false,
    });
  }
};
const createBulkUsers = async (req, res) => {
  let userDetails = req.user;
  const file = req.files.file;
  const dirCodes = join(__dirname, "/../static", "resources");
  if (!fs.existsSync(dirCodes)) fs.mkdirSync(dirCodes, { recursive: true });
  const fileName = `${UUID()}.xlsx`;
  const filePath = join(dirCodes, fileName);
  file.mv(filePath, (err) => {
    if (err) return res.status(500).send("Error in uploading file.");
  });
  const schema = {
    regno: { prop: "regno", type: String },
    stream_id: { prop: "stream_id", type: String },
    course_id: { prop: "course_id", type: String },
    college_id: { prop: "college_id", type: String },
    batch_id: { prop: "batch_id", type: String },
  };
  try {
    let errors = [],
      errorLogs;
    let { rows, err } = await xlsx(filePath, { schema });
    for (let i in rows) {
      try {
        if (!rows[i]["regno"] || rows[i]["regno"].length !== 7) {
          throw { status: 403, regno: rows[i]["regno"] };
        } else {
          await createUserService(rows[i]);
        }
      } catch (err) {
        console.log(err);
        if (err.status === 403 || err.status === 500) errors.push(err.regno);
      }
    }
    errorLogs = new ErrorLogs({
      errorLogs: errors,
      totalLogs: rows.length,
      created_by: userDetails._id,
    });
    await errorLogs.save();
    res.status(201).json({ errorLogs });
  } catch (err) {
    //! Error in creating user
    console.log(err);
    res.status(500).send({
      message: `Error in creating users, Try again later.`,
    });
  } finally {
    fs.unlink(filePath, (err) => (err ? console.log(err) : null));
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role = "student" } = req.query;
    const role_id = (await Role.findOne({ name: role }))._id;
    let response = {},
      query = { role_id, deleted_at: null };
    const count = await User.countDocuments(query);
    response.modelCount = count;
    const users = await User.find(query)
      .sort({ regno: "asc" })
      .limit(limit * 1)
      .skip((page > 0 ? page - 1 : 1) * limit)
      .populate([
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
    response.total = users.length;
    response.users = users
      .filter((user) => user.role_id.name === "student")
      .map((user) => serializeUser(user));
    res.status(200).json(response);
  } catch (err) {
    //! Error in finding user details
    console.log(err);
    res.status(500).json({
      message: `unable to get user details`,
    });
  }
};
module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createBulkUsers,
  getAllUsers,
};
