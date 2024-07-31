const Room = require('../models/room.model.js');
const Quiz = require('../models/quiz.model.js');
const Question = require('../models/question.model.js');
const User = require('../models/user.model.js');

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};


const createRoom = async (request, response) => {
  const { name } = request.body;

  try {
    const code = generateRoomCode();
    const newRoom = new Room({
      name,
      code,
      createdBy: request.userId,
    });

    await newRoom.save();
    response.status(201).send({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    response.status(500).send({ message: 'Server error', error });
  }
};

const joinRoom = async (request, response) => {
  const { code } = request.body;

  try {
    const room = await Room.findOne({ code });
    if (!room) {
      return response.status(404).send({ message: 'Room not found' });
    }

    if (!room.members.includes(request.userId)) {
      room.members.push(request.userId);
      await room.save();
    }

    response.status(200).send({ message: 'Joined room successfully', room });
  } catch (error) {
    response.status(500).send({ message: 'Server error', error });
  }
};

const createQuizInRoom = async (request, response) => {
    const { roomId, title, description, questions } = request.body;
  
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        return response.status(404).send({ message: 'Room not found' });
      }
  
      const questionIds = [];
      for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i];
        const newQuestion = new Question(questionData);
        await newQuestion.save();
        questionIds.push(newQuestion._id);
      }
  
      const newQuiz = new Quiz({
        title,
        description,
        questions: questionIds,
        createdBy: request.userId,
        room: roomId,
      });
  
      await newQuiz.save();
  
      room.quiz.push(newQuiz._id);
      await room.save();
  
      response.status(201).send({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
      response.status(500).send({ message: 'Server error', error });
    }
  };

  const getRoomDetails = async (request, response) => {
    const { roomId } = request.params;
  
    try {
      const room = await Room.findById(roomId).populate('created_by').populate('quiz').populate('members');
  
      if (!room) {
        return response.status(404).json({ message: 'Room not found' });
      }
  
      response.status(200).send(room);
    } catch (error) {
      response.status(500).send({ message: 'Server error', error });
    }
  };

  const addMemberToRoom = async (request, response) => {
    const { roomId, username } = request.body;
  
    try {
      const room = await Room.findById(roomId);
  
      if (!room) {
        return response.status(404).send({ message: 'Room not found' });
      }
  
      const user = await User.findOne({username});
  
      if (!user) {
        return response.status(404).send({ message: 'User not found' });
      }
  
      if (!room.members.includes(user._id)) {
        room.members.push(user._id);
        await room.save();
      }
  
      response.status(200).send({ message: 'Member added successfully', room });
    } catch (error) {
      response.status(500).send({ message: 'Server error', error });
    }
  };

  const deleteRoom = async (request, response) => {
    const { roomId } = request.params;
  
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        return response.status(404).send({ message: 'Room not found' });
      }
  
      if (room.created_by.toString() !== request.userId.toString()) {
        return response.status(403).send({ message: 'You are not authorized to delete this room' });
      }
  
      await Quiz.deleteMany({ room: roomId });
  
      await Room.findByIdAndDelete(roomId);
  
      response.status(200).send({ message: 'Room deleted successfully' });
    } catch (error) {
      response.status(500).send({ message: 'Server error', error });
    }
  };

module.exports = {
  createRoom,
  joinRoom,
  createQuizInRoom,
  getRoomDetails,
  addMemberToRoom,
  deleteRoom
};
