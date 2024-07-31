const express = require('express');
const { createRoom, joinRoom, createQuizInRoom, addMemberToRoom, getRoomDetails, deleteRoom } = require('../controllers/room.controller.js');

const protectRoute = require('../middlewares/protectRoute.js');

const router = express.Router();

router.post('/create', protectRoute, createRoom)
router.post('/join', protectRoute, joinRoom);
router.get('/:roomId', protectRoute, getRoomDetails);
router.put('/addMember', protectRoute, addMemberToRoom);
router.post('/createQuiz', protectRoute, createQuizInRoom);
router.delete('/:roomId', protectRoute, deleteRoom);

module.exports = router;