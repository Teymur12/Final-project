import React, {  useState } from 'react'
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [open,setOpen]=useState(false)
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  
  const navigate = useNavigate();

  const goToSignUp = () =>{
    navigate('/signup')
  }

  return (
    <>
    <section className='nav-section' >
    <nav>  
            <img src="https://www.slido.com/static/slido-logo.a3d453e1.svg" className='logo' alt="" />
            <div className="menulinks">
                <ul>
                    <li className='dropdown'>
                        <Link to={"/"} className='dropbtn'>Product</Link>
                        <div className="dropdown-content">
          <div className="tab">
            <button 
              className={`tablinks ${activeTab === 'Overview' ? 'active' : ''}`} 
              onClick={() => handleTabClick('Overview')}
            >
              Overview
            </button>
            <button 
              className={`tablinks ${activeTab === 'Features' ? 'active' : ''}`} 
              onClick={() => handleTabClick('Features')}
            >
              Features
            </button>
            <button 
              className={`tablinks ${activeTab === 'Pricing' ? 'active' : ''}`} 
              onClick={() => handleTabClick('Pricing')}
            >
              Pricing
            </button>
          </div>
          {activeTab === 'Overview' && (
            <div className="tabcontent show">
              <a href="#product-tour">Product Tour</a>
              <a href="#live-polls">Live Polls</a>
              <a href="#live-qa">Live Q&A</a>
            </div>
          )}

          {activeTab === 'Features' && (
            <div className="tabcontent show">
              <a href="#word-cloud">Word Cloud</a>
              <a href="#quizzes">Quizzes</a>
              <a href="#surveys">Surveys</a>
              <a href="#analytics">Analytics</a>
            </div>
          )}

          {activeTab === 'Pricing' && (
            <div className="tabcontent show">
              <a href="#pricing-details">Pricing Details</a>
              <a href="#free-trial">Free Trial</a>
            </div>
          )}
          </div>
                    </li>
                    <li>
                        <Link to={"/blogs"}>Integrations</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Solutions</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Pricing</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Recourses</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Enterprise</Link>
                    </li>
                </ul>
            </div>
            <div className="nav-buttons">
                <p>Contact Sales</p>
              <Link to={'/signin'}><FaUser/>Log In</Link>
              <button onClick={goToSignUp}>Sign up</button>
            </div>
            <div className="menuicon" onClick={()=>setOpen(true)}>
            <div className="vl"></div>
                <IoMenu/>
            </div>
        </nav>
    </section>
    <div className={`sidebar-menu ${open ? "open" : ""}`}>
      <div>
      <img className='logo' src="https://www.slido.com/static/slido-logo.a3d453e1.svg" alt="" />
         <IoMdClose onClick={()=> setOpen(false)}/>
      </div>
         
           <ul>
                    <li>
                        <Link to={"/"}>Product</Link>
                    </li>
                    <li>
                        <Link to={"/blogs"}>Integrations</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Solutions</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Pricing</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Recourses</Link>
                    </li>
                    <li>
                        <Link to={"/faq"}>Enterprise</Link>
                    </li>
                </ul>
                <hr />
               <div>
               <Link to={'/signin'}><FaUser/>Log In</Link>
                <button onClick={goToSignUp}>Sign up</button>
               </div>
               <div></div>
            </div>
    </>
  )
}

export default Navbar