const Result = require('../models/result.model.js');
const Quiz = require('../models/quiz.model.js');
const User = require('../models/user.model.js');

const createResult = async (request, response) => {
    const { quizId, answers, score } = request.body;
  
    try {
      const quiz = await Quiz.findById(quizId);
  
      if (!quiz) {
        return response.status(404).send({ message: 'Quiz or User not found' });
      }
  
      const result =  Result.create({
        user: request.userId,
        quiz: quizId,
        answers,
        score,
      });
  
      response.status(201).send({ message: 'Result created successfully', result });
    } catch (error) {
      response.status(500).send({ message: 'Server error', error });
    }
  };

const getResultById = async (request, response) => {
  const { resultId } = request.params;

  try {
    const result = await Result.findById(resultId).populate('user').populate('quiz');

    if (!result) {
      return response.status(404).send({ message: 'Result not found' });
    }

    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({ message: 'Server error', error });
  }
};

const getResultsByQuizId = async (request, response) => {
  const { quizId } = request.params;

  try {
    const results = await Result.find({ quiz: quizId }).populate('user').populate('quiz');

    if (!results) {
      return response.status(404).send({ message: 'Results not found' });
    }

    response.status(200).send(results);
  } catch (error) {
    response.status(500).send({ message: 'Server error', error });
  }
};

const updateResult = async (request, response) => {
  const { resultId } = request.params;
  const { answers, score, timeTaken } = request.body;

  try {
    const result = await Result.findById(resultId);

    if (!result) {
      return response.status(404).send({ message: 'Result not found' });
    }

    if (answers) result.answers = answers;
    if (score) result.score = score;
    if (timeTaken) result.timeTaken = timeTaken;

    await result.save();
    response.status(200).send({ message: 'Result updated successfully', result });
  } catch (error) {
    response.status(500).send({ message: 'Server error', error });
  }
};


module.exports = {
  createResult,
  getResultById,
  getResultsByQuizId,
  updateResult,
};
