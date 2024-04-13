const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

// Models
const Course = require('../../models/user/Course');
const User = require('../../models/user/User');

// use
router.use(express.json());

router.get('/allMyCourses', async (req, res) => {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
        token = authHeader.split(" ")[1];
    }
    const { userId } = jwt.verify(token, 'qwertyuiop');
    let user = null;
    user = await User.find({ _id: userId });
    if (user !== null) {
        const courses = await Course.find();
        res.json({
            success: true,
            data: { courses }
        });
    } else {
        res.json({
            success: false,
            error: 'failed auth'
        });
    }
});

router.post('/createCourse', async (req, res) => {
    console.log(req.body);
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/publicCourses', async (req, res) => {
    try {
        let token;
        //console.log(11)
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) {
            token = authHeader.split(" ")[1];
        }
        const { userId } = jwt.verify(token, 'qwertyuiop');
        let user = null;
        user = await User.findOne({ _id: userId });

        if (user !== null) {
            // Authentication is correct, fetch public courses
            const publicCourses = await Course.find({ publicc: true });

            res.status(200).json({ success: true, data: publicCourses });
        } else {
            res.status(401).json({ success: false, message: 'Invalid authentication' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
        token = authHeader.split(" ")[1];
    }
    try {
        const { uid } = jwt.verify(token, 'qwertyuiop');
        const user = await Course.findOne({ _id: uid });
        try {
            const course = await Course.findOne({ _id: req.params.id });
            if (!course) {
                return res.status(404).json({ success: false, error: 'Course not found' });
            }
            res.status(200).json({ success: true, course });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error
        });
    }


});

router.get('/:cid/:ssid/:qid', async (req, res) => {
    const { cid, ssid, qid } = req.params;
    //console.log(12345)
    try {
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) {
            token = authHeader.split(" ")[1];
        }
        const { userId } = jwt.verify(token, 'qwertyuiop');

        try {
            const course = await Course.findOne({ _id: cid })
            const subSec = course.subSec.find(q => q._id.toString() === ssid)
            //console.log(course.subSec[0]._id.toString())
            const quiz = subSec.quizzes.find(q => q._id.toString() === qid)
            //console.log(subSec)
            res.status(200).send({ quiz, success: true })

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, err });
        }
    } catch (err) {
        res.status(401).send(err)
    }
});

router.post('/:cid/:ssid/:qid/submit', async (req, res) => {
    const { cid, ssid, qid } = req.params;
    const corr = req.body;
    let c = {}; let score = 0;

    for (const i in corr) {
        const [a, s] = i.split(' ')
        c[a][s] = corr[i]
    }

    //console.log(12345)
    try {
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) {
            token = authHeader.split(" ")[1];
        }
        const { userId } = jwt.verify(token, 'qwertyuiop');

        try {
            const course = await Course.findOne({ _id: cid })
            const subSec = course.subSec.find(q => q._id.toString() === ssid)
            const quiz = subSec.quizzes.find(q => q._id.toString() === qid)

            /* c.map(cc=>{
                const qss=quiz.qss.find(q=> q._id.toString() === cc[0])
                const que=qss.find(q=> q._id.toString() === cc[1])
                if(que.corr){

                }
            }) */


            res.status(200).send({ c, success: true })

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, err });
        }
    } catch (err) {
        res.status(401).send(err)
    }
});


module.exports = router;
