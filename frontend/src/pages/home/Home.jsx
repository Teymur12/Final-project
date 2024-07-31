import React, { useState } from 'react'
import "./home.css"
import Navbar from '../../layout/header/Navbar';
import Footer from '../../layout/footer/Footer';

const boxShadowStyle = {
  boxShadow:  '5px 5px 10px 2px rgba(0, 0, 0, 0.3)' 
};
const boxShadowStyle1 = {
  boxShadow:  'none' 
};
const Home = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tabName) => {
    if (activeTab === tabName) {
      setActiveTab(null);
    } else {
      setActiveTab(tabName);
    }
  };
  return (
    <>
    <Navbar/>
    <section className='section1'>
    <div className="container">
        <span>Joining as a participant?</span>
        <div className="input-container">
            <span>#</span>
            <input type="text" placeholder="Enter code here"/>
            <div className="arrow">➔</div>
        </div>
      </div>
      <h1>The easiest way to make <br />
      your meetings interactive</h1>
      <p>Engage your participants with live polls, Q&A, quizzes and word clouds <br />
      — whether you meet in the office, online or in-between.</p>
      <button>Get Started for free</button>
      <img src="https://www.slido.com/_next/static/media/slido-polling-video-thumbnail.66f09d6e.jpg" className='video' alt="" />
    </section>
    <section className="section2">
      <h1>Works standalone and with your favorite tools</h1>
      <div>
        <div><img src="https://www.slido.com/static/slido-integrations-ico-webex.c17b0360.svg" alt="" /> <p>Webex</p></div>
        <div><img src="https://www.slido.com/static/slido-integrations-ico-powerpoint.c6a9bfb7.svg" alt="" /><p>PowerPoint</p></div>
        <div><img src="https://www.slido.com/static/slido-integrations-ico-ms-teams.0278afd9.svg" alt="" /><p>Teams</p></div>
        <div><img src="https://www.slido.com/static/slido-integrations-ico-google-slides.5369da74.svg" alt="" /><p>Google Slides</p></div>
        <div><img src="https://www.slido.com/static/slido-integrations-ico-zoom.b91a37a1.svg" alt="" /><p>Zoom</p></div>
      </div>
    </section>
    <section className="section3">
      <h1>It’s how you include everyone <br />
      in your meetings</h1>
      <p>Slido gives you everything you need to engage your participants, capture their views and make everyone feel connected – <br /> whether you’re running a team call, training or an all-company meeting.</p>
      <div>
      <video src="https://www.slido.com/_next/static/media/8448b906f438e0ea.mp4" 
              autoPlay 
              loop 
              playsInline 
              className="video2"
              muted></video>
      <div className="tab-menu">
      <div className="tab-item" style={activeTab=== 'livePolls' ? boxShadowStyle : boxShadowStyle1}>
        <div className="tab-title" onClick={() => toggleTab('livePolls')}>
          <span>📊 Live polls</span>
        </div>
        {activeTab === 'livePolls' && (
          <div className="tab-content">
            <p>
            Turn your one-way presentations into engaging <br /> conversations with live polls, word clouds or <br /> surveys. Ask what people think or how they feel <br /> and get their feedback in real time.
            </p>
          </div>
        )}
      </div>
      <div className="tab-item" style={activeTab=== 'audienceQA' ? boxShadowStyle : boxShadowStyle1}>
        <div className="tab-title" onClick={() => toggleTab('audienceQA')}>
          <span>💬 Audience Q&A</span>
        </div>
        {activeTab === 'audienceQA' && (
          <div className="tab-content">
            <p>
              Give everyone a chance to ask their questions <br />, whether they’re on mute or too shy to speak up. <br />
              People can ask anonymously and vote for the <br /> questions they like, bringing the most important <br />
              topics to light.
            </p>
          </div>
        )}
      </div>
      <div className="tab-item" style={activeTab=== 'quizzes' ? boxShadowStyle : boxShadowStyle1}>
        <div className="tab-title" onClick={() => toggleTab('quizzes')}>
          <span>🏆 Quizzes</span>
        </div>
        {activeTab === 'quizzes' && (
          <div className="tab-content">
            <p>
            Bring a bit of fun to your meetings or training <br /> sessions. Create a live quiz or trivia game and test <br /> people’s knowledge in an interactive way.
            </p>
          </div>
        )}
      </div>
      <div className="tab-item" style={activeTab=== 'analytics' ? boxShadowStyle : boxShadowStyle1}>
        <div className="tab-title" onClick={() => toggleTab('analytics')}>
          <span>📈 Analytics</span>
        </div>
        {activeTab === 'analytics' && (
          <div className="tab-content">
            <p>
            Get valuable insights from your meetings with Slido <br /> Analytics. Find out how many people were engaged <br /> and export your questions or voting results for <br /> further analysis.
            </p>
          </div>
        )}
      </div>
    </div>
      </div>
    </section>
    <section className='section4'>
      <div>
        <img src="https://www.slido.com/static/slido-ico-intuitive-and-easy.8e57ab53.svg" alt="" />
        <h2>Intuitive and easy</h2>
        <p>The attendees can join without any <br /> logins or downloads, and the setup for <br /> hosts takes only minutes.</p>
      </div>
      <div>
        <img src="https://www.slido.com/static/slido-ico-5-polling-options.d9f3c44e.svg" alt="" />
        <h2>5+ polling options</h2>
        <p>With Slido’s 5 types of polls, Q&A, <br /> quizzes and surveys, you can engage <br /> your participants in a variety of ways.</p>
      </div>
      <div>
        <img src="https://www.slido.com/static/slido-ico-get-started-for-free.6aa69787.svg" alt="" />
        <h2>Get started for free</h2>
        <p>Start with our forever-free Basic plan, <br /> or get more from Slido for only US$12.5 <br /> per month.</p>
      </div>
    </section>
    <section className='section5'>
     <div><img src="https://www.slido.com/static/recognition-g2-leader_enterprise.3a3551ed.svg" alt="" /></div>
     <div><img src="https://www.slido.com/static/recognition-g2-best-relationship.182af5b8.svg" alt="" /></div>
     <div><img src="https://www.slido.com/static/recognition-g2-most-implementable-enterprise.ff5dea9d.svg" alt="" /></div>
    </section>
    <section className='section6'>
        <h1>Make your meetings more <br /> interactive with Slido.</h1>
        <button>Try it free</button>
    </section>
        <Footer/>
    </>
  )
}

export default Home