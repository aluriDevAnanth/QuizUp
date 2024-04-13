const mongoose = require('mongoose');

const quizScheme = new mongoose.Schema({
    que: String,
    options: [String],
    corr: String,
}, { timestamps: true });

const rfrSchema = new mongoose.Schema({
    quiz: [quizScheme],
    name: String,
    des: String,
    code: String,
    dura: Number,
    users: [String],
    teacher: String,
    publicc: Boolean,
}, { timestamps: true });

const RFR = mongoose.model('rfrs', rfrSchema);

module.exports = RFR;
