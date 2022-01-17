const bcrypt = require("bcryptjs");
const fs = require("fs");
const { join } = require("path");
const xlsx = require("read-excel-file/node");
const User = require("../models/users");
const ErrorLogs = require("../models/errorLogs");
const { createUserService } = require("../services/userService");
const { serializeUser } = require("../utils/Auth");
let {
  mapBatchId,
  mapCollegeId,
  mapCourseId,
  mapGenderId,
  mapRoleId,
  mapStreamId,
  UUID,
} = require("../utils/helper");
const { contestSubmissionsChartService } = require("../services/chartServices");
const { encryption, decryption } = require("../utils/crypto-js");
//? To register the User
const createUser = async (req, res) => {
  let { encryptedData } = req.body;
  let userDetails = decryption(encryptedData);
  try {
    let { status, message } = await createUserService(userDetails);
    message = encryption(message);
    return res.status(status).json({ message });
  } catch ({ status, message }) {
    //! Error in creating user
    message = encryption(message);
    return res.status(status).json(message);
  }
};
const getUser = async (req, res) => {
  let { user } = req;
  const { id, regno } = req.query;
  if (id && JSON.stringify(id) === JSON.stringify(user._id)) {
    return res.status(200).json(
      encryption({
        user,
        message: "User found",
      })
    );
  }
  let userDetails = user;
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
      return res.status(404).json(
        encryption({
          message: `user not found`,
        })
      );
    //! Student cannot access admin data
    if (req.user.role_id === "student" && userDetails.role_id === "admin")
      return res.status(401).json(
        encryption({
          message: `Unauthorized access`,
        })
      );
    return res.status(200).json(
      encryption({
        userDetails,
        message: "User found",
      })
    );
  } catch (err) {
    //! Error in finding user details
    console.log(err);
    return res.status(500).json(
      encryption({
        message: `unable to find user details`,
      })
    );
  }
};
const updateUser = async (req, res) => {
  let { encryptedData } = req.body;
  let { id, updateDetails } = decryption(encryptedData);
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
      return res.status(404).json(
        encryption({
          message: `user not found`,
        })
      );
    //! Student cannot access admin data
    if (req.user.role_id === "student" && user.role_id.name === "admin")
      return res.status(401).json(
        encryption({
          message: `Unauthorized access`,
        })
      );
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
    //* Validate email
    if (updateDetails.email) user.email = updateDetails.email;
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
    res.status(200).json(
      encryption({
        message: "Updated Successfully.",
      })
    );
  } catch (err) {
    //! Error in finding user details
    console.log(err);
    res.status(500).json(
      encryption({
        message: `Error in Updating User.`,
      })
    );
  }
};
const deleteUser = async (req, res) => {
  try {
    let user = await User.findOne({
      regno: req.query.regno,
      deleted_at: null,
    }).populate({ path: "role_id", model: "role", select: "name" });
    //! User not found
    if (!user || user.deleted_at)
      return res.status(404).json(
        encryption({
          message: `user not found`,
        })
      );
    //! Student cannot access admin data
    if (req.user.role_id === "student" && user.role_id.name === "admin")
      return res.status(401).json(
        encryption({
          message: `Unauthorized access`,
        })
      );
    user.deleted_at = Date.now();
    user.depopulate();
    await user.save();
    res.status(204).json(
      encryption({
        message: "User deleted",
      })
    );
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
    const role_id = await mapRoleId("student");
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
    response = encryption(response);
    res.status(200).json(response);
  } catch (err) {
    //! Error in finding user details
    console.log(err);
    res.status(500).json(
      encryption({
        message: `Error in getting user details`,
      })
    );
  }
};
const adminDashboard = async (req, res) => {
  try {
    let { _id, college_id } = req.user;
    college_id = await mapCollegeId(college_id);
    //TODO:How users count shown ?
    const usersCount = await User.countDocuments({ college_id });
    const { contestSubmissions, message, status } =
      await contestSubmissionsChartService(_id);
    res.status(status).json(
      encryption({
        dashboarDetails: { contestSubmissions, usersCount },
        message,
        status,
        success: true,
      })
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(encryption({ message: "Internal Server Error" }));
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createBulkUsers,
  getAllUsers,
  adminDashboard,
};
