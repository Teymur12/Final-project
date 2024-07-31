import React, { useRef, useState } from 'react';
import Navbar2 from '../../layout/header/Navbar2';
import "./settings.css";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from '../../Slices/user.slice'

const Settings = () => {
  const [editingField, setEditingField] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [profilePicture, setProfilePicture] = useState(null);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch()

  const handleEdit = (field) => {
    setEditingField(field);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    const response = await fetch('api/auth/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
        profilePicture,
      }),
    })
    if (response.ok) {
      const updatedUser = await response.json();
      alert('Profile updated successfully');
      localStorage.setItem('user', updatedUser)
      dispatch(setUser(updatedUser))
      setEditingField(false);
    }
    else{
      alert('Failed to update profile');
      setEditingField(false);
    }
  }

  return (
    <>
      <Navbar2 />
      <section className='section1-settings'>
        <div className="settings-page">
          <div className="settings-container">
            <h1 className="page-title">Account</h1>
            <div className="settings-section">
              <h2 className="settings-title">General Information</h2>
              <div>
                  <img src={user.image} alt="" />
                <div className="non-active-form">
                  {editingField ? (
                    <>
                      <input type="text" defaultValue={user.username} ref={usernameRef} />
                      <button >Save</button>
                    </>
                  ) : (
                    <>
                      <p className="capitalize">Username: {user.username}</p><i onClick={() => handleEdit('true')}><FaPen /></i>
                    </>
                  )}
                </div>
              </div>
              <div>
                <div className="non-active-form">
                  {editingField ? (
                    <>
                      <input type="text" defaultValue={user.email} ref={emailRef} />
                      <button>Save</button>
                    </>
                  ) : (
                    <>
                      <p>Email: {user.email}</p><i onClick={() => handleEdit('true')}><FaPen /></i>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="settings-section">
              <h2 className="settings-title">My profile</h2>
              <form className="form my-form">
                <div className="img-upload-container">
                  <label className="img-upload btn btn-bwm">
                    <input type="file" accept=".jpg, .png, .jpeg, .gif" onChange={handleImageChange} />
                  </label>
                  <h4>Change Your Profile Picture</h4>
                  <div className="img-preview-container">
                    {profilePicture && <img src={profilePicture} style={{width:"220px", height:"80px"}} alt="Profile Preview" className="img-preview" />}
                  </div>
                </div>
                <div className="form-submit">
                  <button className="btn button full" type="submit" disabled>Save New Picture</button>
                </div>
              </form>
            </div>
            <div className="settings-section">
              <h2 className="settings-title">Password</h2>
              <form className="form my-form">
                <div className="form-group">
                  <div className="input-group">
                    <input name="password" placeholder="New Password" type="password" className="form-control" autoComplete="New Password" ref={passwordRef}/>
                    <span className="focus-input"></span>
                  </div>
                </div>
                <div className="form-submit right">
                  <button onClick={(e)=>handleSubmit(e)} className="btn button full" type="submit" >Change Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
