const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../../models/user/User');
const Teacher = require('../../models/teacher/Teacher');

router.use(express.json());

router.get('/auth', async (req, res) => {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
        token = authHeader.split(" ")[1];
    }
    //console.log(11)

    if (token) {
        const { userId } = jwt.verify(token, 'qwertyuiop');
        try {
            const user = await User.findOne({ _id: userId });
            const teacher = await Teacher.findOne({ _id: userId });
            if (teacher) {
                delete teacher.pass;
                res.status(200).json({ success: true, data: teacher, role: 'teacher' });
            } else if (user) {
                delete user.pass;
                res.status(200).json({ success: true, data: user, role: 'student' });
            } else {
                res.status(404).json({ success: false, error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else res.json({ success: false, error: 'error' });

});

router.post('/signup', async (req, res) => {
    const { name, email, pass, role } = req.body;
    try {
        if (role === 'student') {
            const hashedPassword = await bcrypt.hash(req.body.pass, 10);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                pass: hashedPassword,
                role
            });
            res.status(201).json({ success: true, user, role: 'student' });
        } else if (role === 'teacher') {
            const hashedPassword = await bcrypt.hash(req.body.pass, 10);
            const user = await Teacher.create({
                name: req.body.name,
                email: req.body.email,
                pass: hashedPassword, role
            });
            res.status(201).json({ success: true, user, role: 'teacher' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'User creation failed' });
    }
});

router.put('/forgotPass', async (req, res) => {
    try {
        if (!req.body.pass) {
            return res.status(400).json({ success: false, error: 'New password is required' });
        }

        const hashedPassword = await bcrypt.hash(req.body.pass, 10);

        const user = await User.findOneAndUpdate(
            { email: req.body.email },
            { pass: hashedPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Password change failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const teacher = await Teacher.findOne({ email: req.body.email })

        if (user && await bcrypt.compare(req.body.pass, user.pass)) {
            const token = jwt.sign({ userId: user._id }, 'qwertyuiop', { expiresIn: '72h' });
            res.status(200).json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: 'student' }, token });
        } else if (teacher && await bcrypt.compare(req.body.pass, teacher.pass)) {
            const token = jwt.sign({ userId: teacher._id }, 'qwertyuiop', { expiresIn: '72h' });
            res.status(200).json({ success: true, user: { id: teacher._id, name: teacher.name, email: teacher.email, role: 'teacher' }, token });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.put('/passChange', async (req, res) => {
    const { pass, cpass, id, role } = req.body;
    try {
        if (role === 'student') {
            const hashedPassword = await bcrypt.hash(pass, 10);
            const user = await User.findOneAndUpdate({ _id: id }, { pass: hashedPassword });
            res.status(201).json({ success: true, user, role });
        } else if (role === 'teacher') {
            const hashedPassword = await bcrypt.hash(req.body.pass, 10);
            const user = await Teacher.create({
                name: req.body.name,
                email: req.body.email,
                pass: hashedPassword, role
            });
            res.status(201).json({ success: true, user, role });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'User creation failed' });
    }
});

module.exports = router;
