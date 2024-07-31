import React, { useEffect, useState } from 'react';
import './createquiz.css';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
    const navigate = useNavigate()
  const [questions, setQuestions] = useState([
    {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }
  ]);

  const handleQuestionChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    if (updatedQuestions[questionIndex].correctAnswer === updatedQuestions[questionIndex].options[optionIndex]) {
      updatedQuestions[questionIndex].correctAnswer = text;
    }
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerToggle = (questionIndex, optionText) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].correctAnswer === optionText) {
      updatedQuestions[questionIndex].correctAnswer = '';
    } else {
      updatedQuestions[questionIndex].correctAnswer = optionText;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }
    ]);
  };

  const submitQuestions = () =>{
    navigate('/quizeditor', {state:questions});
  }
  const [quizTitle, setQuizTitle] = useState('Untitled Quiz');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    const savedTitle = localStorage.getItem('quizTitle');
    if (savedTitle) {
      setQuizTitle(savedTitle);
    }
  }, []);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    localStorage.setItem('quizTitle', JSON.stringify(quizTitle));
  };

  return (
    <>
      <section className="section-createquiz">
        <header className="header2">
          {isEditingTitle ? (
            <input
              type="text"
              value={quizTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
            />
          ) : (
            <h1 onClick={handleTitleClick}>{quizTitle}</h1>
          )}
        </header>
        <h1>Create Question</h1>
        <div className="quiz-form">
          <div className="header1">
            <button className="close-btn1">X</button>
            <button className="settings-btn">⚙️</button>
          </div>
          {questions.map((question, questionIndex) => (
            <div className="question-section" key={questionIndex}>
              <textarea
                className="question-text"
                placeholder="Type question here"
                value={question.text}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              />
              <div className="options-section">
                {question.options.map((option, optionIndex) => (
                  <div className="option" key={optionIndex}>
                    <textarea
                      className="option-text"
                      placeholder="Type answer option here"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    />
                    <button
                      className={`correct-answer-toggle ${question.correctAnswer === option ? 'correct' : ''}`}
                      onClick={() => handleCorrectAnswerToggle(questionIndex, option)}
                    >
                      ✓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="add-question-btn" onClick={addQuestion}>+ Add Question</button>
          {questions.length>1 &&  (
            <button className="add-question-btn" onClick={submitQuestions}>Submit Questions</button>
          )}
        </div>
      </section>
    </>
  );
};

export default QuizForm;
