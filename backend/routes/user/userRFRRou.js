const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

// Models
const RFR = require('../../models/user/RFR');

// use
router.use(express.json());

router.post('/createRFR', async (req, res) => {
    console.log(req.body.data);
    try {
        let q = req.body;
        const rfr = await RFR.create(q)
        res.status(201).json({ success: true, data: rfr });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/eval', async (req, res) => {
    try {
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader !== undefined) {
            token = authHeader.split(" ")[1];
        }
        const { userId } = jwt.verify(token, 'qwertyuiop');
        try {
            const { ans, id } = req.body;
            //console.log(ans, id)
            const rfr = await RFR.findOne({ _id: id });
            let score = 0;
            for (const i in ans) {
                rfr.quiz.map(q => {
                    if (q._id == i && ans[i] === q.corr) {
                        score = score + 1;
                    }
                })
            }
            res.status(200).send({ success: true, score })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, err, message: 'Internal Server Error' });
        }
    } catch (err) {
        console.log("sdfgv", err)
        res.status(401).send({ err })
    }
});

router.get('/quiz/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const rfr = await RFR.findOne({ code: id })
        if (rfr === null) {
            res.status(500).send({ success: false, err: 'wrong code' })
        } else {
            res.send({ success: true, data: rfr, id })

        }

    } catch (err) {
        res.status(500).send({ success: false, err })
    }
})

module.exports = router;
