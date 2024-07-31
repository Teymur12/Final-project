const express = require('express');

const router = express.Router();

const protectRoute = require('../middlewares/protectRoute.js');
const { createQuiz, getAllQuizs, addQuestiontoQuiz, updateQuiz, deleteQuestion, postProgress, getProgress } = require('../controllers/quiz.controller.js');


router.post('/create', protectRoute, createQuiz);
router.get('/', protectRoute, getAllQuizs);
router.post('/:id', protectRoute, addQuestiontoQuiz);
router.patch('/:id', protectRoute, updateQuiz);
router.delete('/:id', protectRoute, deleteQuestion);
router.post('/:quizId/answer', protectRoute, postProgress)
router.get('/:quizId/progress', protectRoute, getProgress)

module.exports = router;