const mongoose = require('mongoose');

// User Schema
const Quesscehma = mongoose.Schema({
    head: {
        type: String,
        required: true
    },
    ans1: {
        type: String,
        required: true
    },
    ans2: {
        type: String,
        required: true
    },
    ans3: {
        type: String,
        required: true
    },
    ans4: {
        type: String,
        required: true
    }
});

const Ques = (module.exports = mongoose.model("questions", Quesscehma));
