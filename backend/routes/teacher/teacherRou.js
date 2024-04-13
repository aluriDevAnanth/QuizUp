const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');

// Models
const Teacher = require('../../models/teacher/Teacher');
const Course = require('../../models/user/Course');
const User = require('../../models/user/User');

//use
router.use(express.json());

router.get('/dashInfo', async (req, res) => {
    try {
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) {
            token = authHeader.split(" ")[1];
        }
        const { userId } = jwt.verify(token, 'qwertyuiop');
        let teacher = await Teacher.findOne({ _id: userId });

        if (teacher !== null) {
            const totalCourses = await Course.countDocuments({ courses: teacher.name });
            const totalStudents = await User.countDocuments({ courses: { $in: teacher.courses } });
            res.status(200).json({ success: true, data: publicCourses });
        } else {
            res.status(401).json({ success: false, message: 'Invalid authentication' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
