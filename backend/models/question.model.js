const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
     text: {
        type: String,
        required:true
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswer: {
        type: String,
        required: true,
      },
      information:{
        type: String,
      },
      questionImage:{
        type: String,
      }
})

module.exports = mongoose.model('Question', questionSchema);