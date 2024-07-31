import React, { useState, useEffect } from 'react';
import "./inquiz.css";
import { useLocation } from 'react-router-dom';

const Inquiz = () => {
  const location = useLocation();
  const { state } = location;

  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [seconds, setSeconds] = useState(state.seconds);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const resetTimer = () => {
    setSeconds(state.seconds);
  };

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const handleSubmit = () => {
    if (selectedOption) {
      const correctAnswer = state.quiz.questions[index].correctAnswer;
      const correct = selectedOption === correctAnswer;
      setIsSubmitted(true);

      setAnswers(prevAnswers => [
        ...prevAnswers,
        {
          questionId: state.quiz.questions[index]._id,
          selectedOption: selectedOption.toString(),
          isCorrect: correct
        }
      ]);

      setTimeout(() => {
        setIndex(prevIndex => {
          if (prevIndex + 1 < state.quiz.questions.length) {
            resetTimer(); // Reset the timer for the next question
            return prevIndex + 1;
          } else {
            setQuizCompleted(true);
            return prevIndex;
          }
        });
        setSelectedOption(null);
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const submitQuizResults = async () => {
    try {
      const response = await fetch('/api/result/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId: state.quiz._id,
          answers: answers,
          score: 100, // Replace this with the actual score calculation logic
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert("Quiz Completed Successfully!");
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    if (quizCompleted) {
      submitQuizResults();
    }
  }, [quizCompleted]);

  return (
    <>
      <section className='section-inquiz'>
        <div className="container-inquiz">
          <div className="header-inquiz">
            <button className="close-btn">X</button>
            <button className="settings-btn">⚙️</button>
          </div>
          <div className="question-section">
            <h1>Timer: {seconds}s</h1>
            <div className="question-counter">{index + 1}/{state.quiz.questions.length}</div>
            <div className="question-text">{state.quiz.questions[index].questionText}</div>
          </div>
          <div className="response-section">
            <div className="option-container">
              {state.quiz.questions[index].options.map((option, i) => (
                <div
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className={`option-item ${selectedOption === option ? 'selected' : ''} ${isSubmitted && selectedOption === option ? (selectedOption === state.quiz.questions[index].correctAnswer ? 'correct' : 'incorrect') : ''}`}
                >
                  <p>{option}</p>
                </div>
              ))}
            </div>
            <div className="response-actions">
              <button className="show-work-btn">Save & Quit</button>
            </div>
          </div>
          <div className="footer">
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inquiz;
