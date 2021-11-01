const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");
const Role = require("../models/roles");
const Gender = require("../models/genders");
const Stream = require("../models/streams");
const Batch = require("../models/batches");
const Course = require("../models/courses");
const College = require("../models/colleges");

const UUID = () => uuidv4();

//* Find user by given data
const validate = async (data) => {
  try {
    let user = await User.findOne(data);
    return Promise.resolve(user && user.isActive);
  } catch (err) {
    return Promise.reject(err);
  }
};
const mapRoleId = async (name) => {
  try {
    let role = await Role.findOne({ name });
    return Promise.resolve(role._id);
  } catch (err) {
    return Promise.reject(err);
  }
};
const mapGenderId = async (name) => {
  try {
    let gender = await Gender.findOne({ name });
    return Promise.resolve(gender._id);
  } catch (err) {
    return Promise.reject(err);
  }
};
const mapStreamId = async (name) => {
  try {
    let stream = await Stream.findOne({ name });
    return Promise.resolve(stream._id);
  } catch (err) {
    return Promise.reject(err);
  }
};
const mapBatchId = async ([start, end]) => {
  try {
    let batch = await Batch.findOne({ start_year: +start, end_year: +end });
    if (!batch) {
      let newBatch = new Batch({ start_year: +start, end_year: +end });
      newBatch.save();
      return Promise.resolve(newBatch._id);
    }
    return Promise.resolve(batch._id);
  } catch (err) {
    return Promise.reject(err);
  }
};
const mapCourseId = async (name) => {
  try {
    let course = await Course.findOne({ name });
    return Promise.resolve(course._id);
  } catch (err) {
    return Promise.reject(err);
  }
};
const mapCollegeId = async (name) => {
  try {
    let college = await College.findOne({ name });
    return Promise.resolve(college._id);
  } catch (err) {
    return Promise.reject(err);
  }
};
const mapUserId = async (name) => {
  const user = await User.findOne({ name });
  if (user && !user.deleted_at) return user._id;
  throw "Invalid user entry";
};
module.exports = {
  UUID,
  validate,
  mapBatchId,
  mapCollegeId,
  mapCourseId,
  mapGenderId,
  mapRoleId,
  mapStreamId,
  mapUserId,
};
