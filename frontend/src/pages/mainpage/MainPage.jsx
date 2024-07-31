import React, { useEffect, useState } from 'react';
import Navbar2 from '../../layout/header/Navbar2';
import "./main.css";
import Footer2 from '../../layout/footer/Footer2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "480px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "13px",
  marginBottom: "10px"
};

const imageStyle = {
  width: "480px",
  height: "240px",
  borderRadius: "13px",
}

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({
    _id: "",
    title: {},
    quizImage: "",
    description:"",
    questions: [],
    createdAt: "",
    createdBy: {}
  });
  const [quizzes, setQuizzes] = useState([]);
  const user = useSelector(state => state.user.user);

  const navigate = useNavigate()

  const handleOpen = (quiz) => {
    setSelectedQuiz({
      _id: quiz._id,
      title: quiz.title,
      quizImage: quiz.quizImage,
      description: quiz.description,
      questions: quiz.questions,
      createdAt: quiz.createdAt,
      createdBy: quiz.createdBy,
    });
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const getQuizzes = async () => {
    const response = await fetch('/api/quiz/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (!response.ok) {
      console.log("Error occurred");
    } else {
      setQuizzes(data);
    }
  }

  useEffect(() => {
    getQuizzes();
  }, []);

  const goToQuiz = (quiz) => {
    navigate(`/quiz/${quiz._id}`, {state:{quiz:quiz}});
  };

  return (
    <>
      <Navbar2 />
      <section className='section1-main'>
        <div className="dashboard">
          <div className="join-section">
            <input type="text" placeholder="Enter a join code" />
            <button>Join</button>
          </div>
          <div className="user-info">
            {user && (
              <div className="user-card">
                <img src={user.image} alt="User Avatar" className="avatar" />
                <div className="user-details">
                  <p>Hello, {user.username}</p>
                  <p>Points: {user.points}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <h1 style={{ marginBottom: "20px" }}>Quizzes</h1>
        <div className='quizzes'>
          {quizzes && quizzes.map(quiz => (
            <div key={quiz._id} className='quiz'>
              <img src={quiz.quizImage} alt={quiz.title.name} />
              <Button onClick={() => handleOpen(quiz)}>{quiz.title.name}</Button>
            </div>
          ))}
        </div>
      </section>
      <Footer2 />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="box">
            {selectedQuiz && (
              <>
                <img style={imageStyle} src={selectedQuiz.quizImage} alt={selectedQuiz.title.name} />
                <h3>{selectedQuiz.title.name}</h3>
                <p>Created by: {selectedQuiz.createdBy.username}</p> 
                <div className='display-flex' style={{ gap: "15px" }}>
                  <button className='start-quiz' onClick={()=>goToQuiz(selectedQuiz)}>Start Quiz</button>
                  <button className='cancel-btn' onClick={handleClose}>Cancel</button>
                </div>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default MainPage;
