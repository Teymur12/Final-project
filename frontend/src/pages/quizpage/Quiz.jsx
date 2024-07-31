import React, { useState } from 'react';
import "./quiz.css";
import { FaShareAlt } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(15);

  const handleTimeChange = (event) => {
    setSelectedTime(Number(event.target.value));
  };

  const goToQuizzes = () => {
    navigate(`/inquiz/${state.quiz._id}`, { state: { quiz: state.quiz, seconds: selectedTime } });
  };

  return (
    <section className='quiz-section'>
      <div className="container-quiz">
        <div className="header-quiz">
          <button className="close-btn">X</button>
        </div>
        <div className="content">
          <div className="quiz-info">
            <div className="quiz-title">{state.quiz.title.name}</div>
            <div className="quiz-details">{state.quiz.questions.length} questions</div>
            <div className="quiz-author">By : {state.quiz.createdBy.username}</div>
            <button className="share-btn"><FaShareAlt />Share</button>
          </div>
          <div className="actions">
            <button className="start-btn" onClick={goToQuizzes}>Start</button>
            <button className="challenge-btn">Challenge friends</button>
          </div>
          <div className="settings">
            <p>Time for each question</p>
            <div className="setting-item">
              <span>15 s</span>
              <input type="radio" name='clock' value="15" checked={selectedTime === 15} onChange={handleTimeChange} />
            </div>
            <div className="setting-item">
              <span>30 s</span>
              <input type="radio" name='clock' value="30" checked={selectedTime === 30} onChange={handleTimeChange} />
            </div>
            <div className="setting-item">
              <span>45 s</span>
              <input type="radio" name='clock' value="45" checked={selectedTime === 45} onChange={handleTimeChange} />
            </div>
            <div className="setting-item">
              <span>60 s</span>
              <input type="radio" name='clock' value="60" checked={selectedTime === 60} onChange={handleTimeChange} />
            </div>
          </div>
          <div className="themes">
            <div className="theme-item">Random</div>
            <div className="theme-item">Classic</div>
            <div className="theme-item">Cosmic</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
