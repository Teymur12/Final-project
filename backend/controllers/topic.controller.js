const Topic = require('../models/topic.model.js');

module.exports.createTopic = async (request,response) => {
    const { name } = request.body;

    if (!name) {
        return response.response(404).send({ error : 'Please fill in the name'})
    }

    const topic = await Topic.findOne({ name: name});

    if (topic) {
        return response.status(409).send({ error : 'Topic already exists'})
    }

    const newTopic = await Topic.create({ name });
    
    response.status(201).send(newTopic);
};

module.exports.getAllTopics = async (request, response) => {
    const topics = await Topic.find({});
    if (!topics) {
        return response.status(404).send({ error: 'No topics found' });
    }
    response.status(200).send(topics);
}

module.exports.getSingleTopic = async (request, response) => {
    const { name } = request.body;
    const topic = await Topic.findOne({ name});
    if (!topic) {
        return response.status(404).send({ error : 'Topic not found'})
    }
    response.status(200).send(topic);
}