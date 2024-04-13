const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  },
  role: {
    type: String,
    required: true,
  },
  courses: []
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User;
