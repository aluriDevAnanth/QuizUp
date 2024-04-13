const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

// Models
const { Quiz } = require('../../models/user/Quiz');
const User = require('../../models/user/User');
const RFR = require('../../models/user/RFR');

// use
router.use(express.json());

router.get('/allPublicQuizs', async (req, res) => {
    try {
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) token = authHeader.split(" ")[1];

        const { userId } = jwt.verify(token, 'qwertyuiop');
        try {
            const quiz = await RFR.find({ publicc: true })
            //console.log(quiz, 11)
            res.status(200).send({ data: quiz, success: true })
        } catch (err) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } catch (err) {
        res.status(401).send(err)
    }
});

router.post('/createQuiz', async (req, res) => {
    try {
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) {
            token = authHeader.split(" ")[1];
        }
        const { userId } = jwt.verify(token, 'qwertyuiop');

        try {
            const qq = req.body;
            await Quiz.create(qq)
            res.status(200).send({
                success: true, data: qq
            })

        } catch (err) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } catch (err) {
        res.status(401).send(err)
    }
});

/* router.post('/eval', async (req, res) => {
    try {
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) {
            token = authHeader.split(" ")[1];
        }
        const { userId } = jwt.verify(token, 'qwertyuiop');

        try {
            const qq = req.body;
            await Quiz.create(qq)
            res.status(200).send({
                success:true,data:qq
            })

        } catch (err) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } catch (err) {
        res.status(401).send(err)
    }
}); */

module.exports = router;
