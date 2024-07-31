const Question = require('../models/question.model.js')

module.exports.createQuestion = async (request,response) => {
    const { text, options, correctAnswer, information } = request.body;

    const questionImage = request.files['questionImage'] ? request.files['questionImage'][0].path : null;

    if (!text, !options, !correctAnswer){
        return response.status(404).send({ error : 'Please fill all required fields'})
    }

    const existingQuestion = await Question.findOne({text});
    if(existingQuestion){
        return response.status(404).send({ error : 'Question already exists'})
    }
    
    const newQuestion = await Question.create({
        text,
        options,
        correctAnswer,
        information,
        questionImage
    });

    response.status(200).send(newQuestion);

};
module.exports.deleteQuestion = async (request,response) => {
    const { id } = request.params;
    const question = await Question.findByIdAndDelete(id);
    if(!question){
        return response.status(404).send({ error : 'Question not found'})
    }
    response.status(200).send(question);
};
module.exports.getQuestions = async (request,response) => {
    const questions = await Question.find({});
    if (!questions) {
        return response.status(404).send({ error : 'Error while getting questions' })
    }
    response.status(200).send(questions)
};
module.exports.getSingleQuestions = async (request,response) => {
    const { id } = request.params;
    const question = await Question.findById(id);
    if (!question) {
        return response.status(404).send({ error : 'Question not found' })
    }
    response.status(200).send(question)
};