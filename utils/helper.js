const { v4: uuidv4 } = require('uuid');
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
  let user = await User.findOne(data);
  return (user && !user.isActive) ? false : true;
};
const mapRoleId = async (name) => {
  let role = await Role.findOne({ name });
  return role._id;
};
const mapGenderId = async (name) => {
  let gender = await Gender.findOne({ name });
  return gender._id;
};
const mapStreamId = async (name) => {
  let stream = await Stream.findOne({ name });
  return stream._id;
};
const mapBatchId = async ([start, end]) => {
  let batch = await Batch.findOne({ start_year: +start, end_year: +end });
  if (!batch) {
    let newBatch = new Batch({ start_year: +start, end_year: +end });
    newBatch.save();
    return newBatch._id;
  }
  return batch._id;
};
const mapCourseId = async (name) => {
  let course = await Course.findOne({ name });
  return course._id;
};
const mapCollegeId = async (name) => {
  let college = await College.findOne({ name });
  return college._id;
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
};
