const mongoose = require('mongoose');

const queSchema = new mongoose.Schema({
    que: String,
    options: [String],
    markedForReview: Boolean,
    corr: String,
});

const quizSubSecSchema = new mongoose.Schema({
    que: [queSchema],
    name: String,
    dura: Number,
    totalMarks: String,
});

const quizSchema = new mongoose.Schema({
    qss: [quizSubSecSchema],
    name: String,
    des: String,
    score: String,
    HighScore: String,
    avgScore: String,
    startDate: String,
    compDate: String,
    dura: String,
    totalMarks: String,
    markedForReview: [Boolean],
    corr: [String],
});

const Quiz = mongoose.model('quizzes', quizSchema);

module.exports = { Quiz, quizSchema };
