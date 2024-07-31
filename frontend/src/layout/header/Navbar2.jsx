import React, { useState } from 'react'
import "./navbar2.css"
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar2 = () => {
  const [active, setActive] = useState(true)
  const [active1, setActive1] = useState(false)
  const [active2, setActive2] = useState(false)
  const [drop, setDrop] = useState(false)

  const user = useSelector(state => state.user.user)

  const activeFunction = ()=>{
    setActive(true)
    setActive1(false)
    setActive2(false)
  }
  const activeFunction1 = ()=>{
    setActive(false)
    setActive1(true)
    setActive2(false)
  }
  const activeFunction2 = ()=>{
    setActive(false)
    setActive1(false)
    setActive2(true)
  }
  
  const goToSettings = () => {
    window.location.href = "/settings"
  }

  const logout = async () =>{
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    })
    if(response.ok){
      localStorage.removeItem('user')
      window.location.href = "/signin"
    }
    else{
      console.log("Error")
    }
  }

  return (
    <>
    <section className='nav-section'>
    <nav style={{height:"50px"}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Quizziz_Logo.png" alt="" className="logo" />
            <div className="searchBox">
              <input className="searchInput" type="text" name="" placeholder="Find a Quiz"/>
              <button className="searchButton" href="#">
                  <i className="material-icons">
                      <CiSearch />
                  </i>
              </button>
              </div>
              <ul className='menulinks-2'>
              <li className={active ? 'active' : ''} onClick={() => activeFunction()}><FaHome /> Home</li>
          <li className={active1 ? 'active' : ''} onClick={() => activeFunction1()}><FaHistory /> Activity</li>
          <li className={active2 ? 'active' : ''} onClick={() => activeFunction2()}>Classes</li>
              </ul>
      
      <button className='display-flex button-dashborard' onClick={()=>window.location.href = "/createquiz"}><FaChalkboardTeacher/>Instructor Dashboard</button>
              <div style={{position:"relative"}}>
              <button className='button-dropdwn' onClick={()=> setDrop(!drop)}><IoMdMenu/></button>
              <div className='dropdown-exit' style={drop ? {display:"flex"}:{display:'none'}}>
                <div>
                <span>{user.username}</span>
                <span>{user.email}</span>
                </div>
                <hr />
                <div>
                <button onClick={goToSettings}><IoSettingsOutline/>Settings</button>
                <button onClick={logout}><IoLogOutOutline/> Log out</button>
                </div>
              </div>
              </div>
              
        </nav>
    </section>
        
    </>
  )
}

export default Navbar2