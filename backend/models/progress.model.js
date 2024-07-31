const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    currentQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
    answers: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        },
        answer: {
            type: String,
        },
        answeredAt: {
            type: Date,
            default: Date.now,
        },
    }],
    startedAt: {
        type: Date,
        default: Date.now,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Progress', progressSchema);
