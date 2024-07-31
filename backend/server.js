const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

const authRoutes = require('./routes/auth.route.js');
const questionRoutes = require('./routes/question.route.js');
const topicRoutes = require('./routes/topic.route.js');
const quizRoutes = require('./routes/quiz.route.js');
const resultRoutes = require('./routes/result.route.js');
const roomRoutes = require('./routes/room.route.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Image");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'userImage', maxCount: 1 },
    { name: 'questionImage', maxCount: 1 },
    { name: 'quizImage', maxCount: 1 }
]);

app.use(express.static("./"));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", upload, authRoutes);
app.use("/api/question", upload, questionRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/quiz", upload, quizRoutes);

mongoose.connect(MONGODB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} and connected`);
    });
}).catch((error) => {
    console.log(error.message);
});
