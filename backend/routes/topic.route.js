const express = require('express');

const router = express.Router();

const { createTopic, getAllTopics, getSingleTopic } = require('../controllers/topic.controller.js')

router.post('/create', createTopic);
router.get('/', getAllTopics);
router.get('/single', getSingleTopic)

module.exports = router