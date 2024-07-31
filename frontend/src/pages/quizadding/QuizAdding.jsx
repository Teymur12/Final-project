import React, { useState, useEffect } from 'react';
import "./quizadding.css";
import { useLocation } from 'react-router-dom';

const QuizEditor = () => {
  const location = useLocation();
  const { state } = location;

  localStorage.setItem('questions', JSON.stringify(state));

  const [quizTitle, setQuizTitle] = useState('Untitled Quiz');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [quizImage, setQuizImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const savedTitle = localStorage.getItem('quizTitle');
    const savedQuizImage = localStorage.getItem('quizImage');
    const previousQuestions = JSON.parse(localStorage.getItem('questions'));
    if (savedTitle) {
      setQuizTitle(savedTitle);
    }
    if (savedQuizImage) {
      setQuizImage(savedQuizImage);
    }
    if (previousQuestions) {
      setQuestions(previousQuestions);
    }
    if (state) {
      setQuestions(prev => ([...prev, ...state]));
    }
  }, [state]);

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

  const handleOptionChange = (questionIndex, optionText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = optionText;
    setQuestions(updatedQuestions);
  };

  const handleQuizImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setQuizImage(reader.result);
      localStorage.setItem('quizImage', reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const title = "66aa5f688b5763320ae30965"
    console.log(questions);
    try {
      const response = await fetch('/api/quiz/create', {
        method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title ,
          questions: questions,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }
      const createdQuiz = await response.json();
      localStorage.removeItem("questions")
      localStorage.removeItem('quizImage')
      alert(`Quiz "${quizTitle}" has been created successfully.`);
      window.location.href = `/quiz/${createdQuiz._id}`;
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz. Please try again.');
    }
  };

  return (
    <section className="quizeditor-section">
      <div className="quiz-editor">
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
        <div className="quiz-image-upload">
          <input type="file" onChange={handleQuizImageUpload} />
          {quizImage && <img src={quizImage} alt="Quiz" className="quiz-image" />}
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search questions from Quizizz Library" />
        </div>
        <div className="question-section">
          <div className="question-header">
            <p>{questions.length} question(s)</p>
          </div>
          {questions.map((question, questionIndex) => (
            question.text && (
              <div className="question-card" key={questionIndex}>
                <div className="question-details">
                  <p>1. Multiple Choice</p>
                  <select>
                    <option>30 seconds</option>
                  </select>
                  <select>
                    <option>1 point</option>
                    <option>2 point</option>
                    <option>3 point</option>
                  </select>
                </div>
                <div className="question-content">
                  <input type="text" value={question.text} readOnly />
                  <div className="answer-choices">
                    {question.options.map((option, optionIndex) => (
                      <div className="setting-item" key={optionIndex}>
                        <span>{option}</span>
                        <input
                          type="radio"
                          name={`correctAnswer-${questionIndex}`}
                          value={option}
                          checked={question.correctAnswer === option}
                          onChange={() => handleOptionChange(questionIndex, option)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
          <button className="add-question">+ Add question</button>
          <button className="add-question" onClick={handleSubmit}>Submit Quiz</button>
          <button className="add-similar-questions">Add similar questions (AI)</button>
        </div>
      </div>
    </section>
  );
};

export default QuizEditor;
