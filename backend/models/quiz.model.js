const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    quizImage: {
        type: String,
        default: "../Image/1722441780614-programing.jpg", 
        required: true,
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
