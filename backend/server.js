const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

// Models imports
const User = require('./models/user/User');

//Routes imports -user
const userRou = require('./routes/user/userRou');
const userCourseRou = require('./routes/user/userCourseRou');
const userRFRRou = require('./routes/user/userRFRRou');
const userQuizRou = require('./routes/user/userQuizRou');
//Routes imports -teacher
const teacherRou = require("./routes/teacher/teacherRou")
const teacherCourseRou = require("./routes/teacher/teacherCourseRou")
const teacherRFRRou = require("./routes/teacher/teacherRFRRou")

const app = express();

//use
app.use(cors())
app.use(express.json());

//use user routes
app.use('/user', userRou);
app.use('/user/course', userCourseRou);
app.use('/user/quiz', userQuizRou)
app.use('/user/rfr', userRFRRou);
//use teacher routes
app.use('/teacher', teacherRou);
app.use('/teacher/course', teacherCourseRou);
app.use('/teacher/rfr', teacherRFRRou);

const port = 3000;
const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/QuizUp');

        app.listen(port, () => {
            console.log(`listening on port ${port} lala`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
