const mongoose = require('mongoose');
const { quizSchema } = require("./Quiz.js")

const subSecSchema = new mongoose.Schema({
    name: String,
    quizzes: [quizSchema],
    exp: String,
    start: String
});

const courseSchema = new mongoose.Schema({
    name: String,
    publicc: Boolean,
    des: String,
    subSec: [subSecSchema],
    teacher: String,
    start: String,
    exp: String,
}, { timestamps: true });

const Course = mongoose.model('courses', courseSchema);

module.exports = Course;
