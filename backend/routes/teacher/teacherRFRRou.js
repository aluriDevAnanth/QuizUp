const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Models
const Teacher = require('../../models/teacher/Teacher');
const Course = require('../../models/user/Course');
const User = require('../../models/user/User');
const RFR = require("../../models/user/RFR")

//use
router.use(express.json());

function generateRandomAlphaNumeric() {
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))).join('');
}

router.get('/getAllMyRFRs', async (req, res) => {

  let token;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    token = authHeader.split(" ")[1];
  }
  const { userId } = jwt.verify(token, 'qwertyuiop');
  let teacher = await Teacher.findOne({ _id: userId });

  if (teacher !== null) {
    const rfr = await RFR.find({ teacher: userId });
    res.status(200).json({ success: true, data: { rfr } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid authentication' });
  }

});

router.post('/addRFR', async (req, res) => {
  try {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      token = authHeader.split(" ")[1];
    }
    const { userId } = jwt.verify(token, 'qwertyuiop');
    let teacher = await Teacher.findOne({ _id: userId });

    if (teacher !== null) {
      let { data } = req.body
      data = { ...data, teacher: userId, code: generateRandomAlphaNumeric() }
      //console.log(data);
      const rfr = await RFR.create({ ...data });
      res.status(200).json({ success: true, data: { rfr } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid authentication' });
    }
  } catch (error) {
    console.log(error);
  }

});

router.post('/addStudents', async (req, res) => {
  try {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      token = authHeader.split(" ")[1];
    }
    const { userId } = jwt.verify(token, 'qwertyuiop');
    let teacher = await Teacher.findOne({ _id: userId });

    if (teacher !== null) {
      let { users, curr1 } = req.body
      users = users.split(',');
      console.log(users, curr1);
      let q = await RFR.findOne({ _id: curr1 });
      q.users = users;
      const rfr = await RFR.findOneAndUpdate({ _id: curr1 }, { ...q }, { new: true });
      res.status(200).json({ success: true, data: { rfr } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid authentication' });
    }
  } catch (error) {
    console.log(error);
  }

});

router.put('/editCourse', async (req, res) => {

  let token;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    token = authHeader.split(" ")[1];
  }
  const { userId } = jwt.verify(token, 'qwertyuiop');
  let teacher = await Teacher.findOne({ _id: userId });

  if (teacher !== null) {
    let { data } = req.body
    console.log(data);
    const courses = await Course.findOneAndUpdate({ _id: data._id }, { ...data });
    res.status(200).json({ success: true, data: { courses } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid authentication' });
  }

});

module.exports = router;
