const Quiz = require('../models/quiz.model.js');
const Question = require('../models/question.model.js');
const Progress = require('../models/progress.model.js');

module.exports.createQuiz = async (request, response) => {
    const { title, description, questions, room, topic } = request.body;

    // const quizImage = request.files['quizImage'] ? request.files['quizImage'][0].path : null

    if (!title || !questions) {
        return response.status(404).send({ error : 'Please fill all the required fields'})

    }

        const quizQuestions = [];
        for (const question of questions) {
          const text = question.text
          const exisgtingQuestion = await Question.findOne({text})
            if (exisgtingQuestion) {
                quizQuestions.push(exisgtingQuestion._id);
            }
            else{
                const newQuestion = await Question.create({
                    text: question.text,
                    options: question.options,
                    correctAnswer: question.correctAnswer,
                    createdBy: request.userId,
                    information: question?.information,
                    // questionImage: request.files['questionImage'] ? request.files['questionImage'][0].path : null 
                });
                quizQuestions.push(newQuestion._id);
            }
        }
        const newQuiz = await Quiz.create({
            title,
            description,
            questions: quizQuestions,
            createdBy: request.userId, 
            room,
            topic,
            
          });
          if (!newQuiz) {
            return response.status(404).send({error: 'Quiz can not be created'})
          }
          response.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    
}
module.exports.getAllQuizs = async (request, response) => {
    const quizzes = await Quiz.find({}).populate("createdBy").populate('title').populate('questions');
    if (!quizzes) {
        return response.status(404).send({ error: 'No quizzes found' });
    }
    response.status(200).send(quizzes);
}
module.exports.addQuestiontoQuiz = async (request, response) => {
    const { quizId } = request.params;
    const { title, description, questions, room } = request.body;
  
    try {
      const quiz = await Quiz.findById(quizId);
  
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      if (title) quiz.title = title;
      if (description) quiz.description = description;
      if (room) quiz.room = room;
  
      if (questions) {
        const updatedQuestions = [];
  
        for (const question of questions) {
          if (question._id) {
            updatedQuestions.push(question._id);
          } else {
            const newQuestion = new Question({
              text: question.text,
              options: question.options,
              correctAnswer: question.correctAnswer,
              createdBy: request.user.Id, 
            });
  
            await newQuestion.save();
            updatedQuestions.push(newQuestion._id);
          }
        }
  
        quiz.questions = updatedQuestions;
      }
  
      await quiz.save();
      response.status(200).json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
      response.status(500).json({ message: 'Server error', error });
    }
}
module.exports.updateQuiz = async (request, res) => {
    const { quizId } = request.params;
    const { title, description, questions, room } = request.body;
  
    try {
      const quiz = await Quiz.findById(quizId);
  
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      if (title) quiz.title = title;
      if (description) quiz.description = description;
      if (room) quiz.room = room;
  
      if (questions) {
        const updatedQuestions = [];
  
        for (const question of questions) {
          if (question._id) {
            const existingQuestion = await Question.findById(question._id);
            if (existingQuestion) {
              existingQuestion.text = question.text || existingQuestion.text;
              existingQuestion.options = question.options || existingQuestion.options;
              existingQuestion.correctAnswer = question.correctAnswer || existingQuestion.correctAnswer;
              await existingQuestion.save();
              updatedQuestions.push(existingQuestion._id);
            } else {
              return res.status(404).json({ message: `Question with ID ${question._id} not found` });
            }
          } else {
            const newQuestion = new Question({
              text: question.text,
              options: question.options,
              correctAnswer: question.correctAnswer,
              createdBy: request.userId, 
            });
  
            await newQuestion.save();
            updatedQuestions.push(newQuestion._id);
          }
        }
  
        quiz.questions = updatedQuestions;
      }
  
      await quiz.save();
      res.status(200).json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
module.exports.deleteQuestion = async (request, response) => {
    const { id } = request.params;
    const quiz = await Quiz.findByIdAndDelete({ _id : id });
    if (!quiz) {
        return response.status(404).send({ error: 'Quiz not found' });
    }
    response.status(200).send(quiz);
}

module.exports.postProgress = async (request, response) => {
  const { questionId, answer } = request.body;
  const { quizId } = request.params;

  try {
      let progress = await Progress.findOne({ user: userId, quiz: quizId });

      if (!progress) {
          progress = await Progress.create({
              user: request.userId,
              quiz: quizId,
              currentQuestion: questionId,
              answers: [{ question: questionId, answer }],
          });
      } else {
          progress.currentQuestion = questionId;
          progress.answers.push({ question: questionId, answer });
      }

      response.status(200).json({ message: 'Progress updated' });
  } catch (error) {
      response.status(500).json({ message: 'Error updating progress', error });
  }
};

module.exports.getProgress = async (request, response) => {
  const { userId } = request.userId;
  const { quizId } = request.params;

  try {
      const progress = await Progress.findOne({ user: userId, quiz: quizId })
          .populate('currentQuestion')
          .populate('answers.question');

      if (!progress) {
          return response.status(404).json({ message: 'No progress found for this quiz' });
      }

      response.status(200).json({ progress });
  } catch (error) {
      response.status(500).json({ message: 'Error fetching progress', error });
  }
};