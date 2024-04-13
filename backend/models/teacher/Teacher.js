const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  pass: {
    type: String,
    required: true,
  }, role: {
    type: String,
    required: true,
  },
  courses: [String],
}, { timestamps: true });

const Teacher = mongoose.model('teachers', TeacherSchema);

module.exports = Teacher;
