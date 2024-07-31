const express = require('express');

const { createResult, getResultById, getResultsByQuizId, updateResult } = require('../controllers/result.controller.js');

const protectRoute = require('../middlewares/protectRoute.js');

const router = express.Router();

router.post('/', protectRoute, createResult);
router.get('/:resultId', protectRoute, getResultById);
router.get('/quiz/:quizId', protectRoute, getResultsByQuizId);
router.put('/:resultId', protectRoute, updateResult);


module.exports = router