const User = require("../models/users");
const Role = require("../models/roles");
const Gender = require("../models/genders");
const Stream = require("../models/streams");
const Batch = require("../models/batches");
const Course = require("../models/courses");
const College = require("../models/colleges");

const validateRegisterNumber = async (regno) => {
  let user = await User.findOne({ regno });
  return user ? false : true;
};
const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
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
const mapGenderName = async (id) => {
  let gender = await Gender.findById(id);
  return gender.name;
};
const mapStreamName = async (id) => {
  let stream = await Stream.findById(id);
  return stream.name;
};
const mapBatchYear = async (id) => {
  let batch = await Batch.findById(id);
  return `${batch.start_year}-${batch.end_year}`;
};
const mapCourseName = async (id) => {
  let course = await Course.findById(id);
  return course.name;
};
const mapCollegeName = async (id) => {
  let college = await College.findById(id);
  return college.name;
};

const mapUserId = async (name) => {
  const user = await User.findOne(name);
  return user._id;
};
module.exports = {
  validateEmail,
  validateRegisterNumber,
  mapBatchId,
  mapBatchYear,
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
  mapUserId,
};
