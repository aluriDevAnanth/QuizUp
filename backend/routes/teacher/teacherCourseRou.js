const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Models
const Teacher = require('../../models/teacher/Teacher');
const Course = require('../../models/user/Course');
const User = require('../../models/user/User');

//use
router.use(express.json());

router.get('/getAllMyCourses', async (req, res) => {

  let token;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    token = authHeader.split(" ")[1];
  }
  const { userId } = jwt.verify(token, 'qwertyuiop');
  let teacher = await Teacher.findOne({ _id: userId });

  if (teacher !== null) {
    const courses = await Course.find({ teacher: userId });
    console.log(1111);
    res.status(200).json({ success: true, data: courses });
  } else {
    res.status(401).json({ success: false, message: 'Invalid authentication' });
  }

});

router.post('/addCourse', async (req, res) => {

  let token;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    token = authHeader.split(" ")[1];
  }
  const { userId } = jwt.verify(token, 'qwertyuiop');
  let teacher = await Teacher.findOne({ _id: userId });

  if (teacher !== null) {
    let { data } = req.body
    data = { ...data, teacher: userId }
    console.log(data);
    const courses = await Course.create({ ...data });
    res.status(200).json({ success: true, data: courses, Course });
  } else {
    res.status(401).json({ success: false, message: 'Invalid authentication' });
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

router.put('/editStudents', async (req, res) => {
  try {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      token = authHeader.split(" ")[1];
    }
    const { userId } = jwt.verify(token, 'qwertyuiop');
    let teacher = await Teacher.findOne({ _id: userId });

    if (teacher !== null) {
      let { users, curr } = req.body
      users = users.split(',');
      let q = await Course.findOne({ _id: curr._id });
      q.users = users;
      const course = await Course.findOneAndUpdate({ _id: curr._id }, { ...q }, { new: true });
      res.status(200).json({ success: true, data: { course } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid authentication' });
    }
  } catch (error) {
    console.log(error);
  }

});

module.exports = router; 
