import React, { useRef } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmPassword
        })
      });

      if (!response.ok) {
        console.log(response);
      } else {
        alert('You signed up successfully');
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container1">
      <div className="participant">
        <h2>Joining as a participant?</h2>
        <p>No account needed.</p>
        <div className="event-code">
          <input type="text" placeholder="Enter event code" />
          <button>&rarr;</button>
        </div>
      </div>
      <div className="host">
        <img src="https://www.slido.com/static/slido-logo.a3d453e1.svg" alt="" />
        <h2>Sign up as <br /> a meeting host</h2>
        <p>or <Link to={"/signin"}>Log in to your account</Link></p>
        <div>
          <button className="signup-webex">Signup with Webex</button>
          <button className="signup-google">Signup with Google</button>
        </div>
        <p>or</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" required ref={emailRef} />
          <input type="text" placeholder="Full name" required ref={usernameRef} />
          <input type="password" placeholder="Password" required ref={passwordRef} />
          <input type="password" placeholder="Confirm password" required ref={confirmPasswordRef} />
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
