import React from 'react'
import "./footer.css"


const Footer = () => {
  return (
    <>
      <footer>
        <div className="footparts">
          <img src="https://www.slido.com/static/slido-logo.a3d453e1.svg" className='logo' alt="" />
        </div>
        <div className="footparts">
          <h3>Product</h3>
          <ul>
            <li>Product Tour</li>
            <li>Q&A</li>
            <li>Polls</li>
            <li>Quizzes</li>
            <li>Analytics</li>
            <li>Integrations</li>
          </ul>
        </div>
        <div className="footparts">
          <h3>Integrations</h3>
          <ul>
            <li>PowerPoint</li>
            <li>Google Slides</li>
            <li>Webex</li>
            <li>Zoom</li>
            <li>Microsoft Teams</li>
            <li>Live Video</li>
            <li>Embed Slido</li>
          </ul>
        </div>
        <div className="footparts">
          <h3>Pricing</h3>
          <ul>
            <li>One-time Plans</li>
            <li>Annual Plans</li>
            <li>Education Plans</li>
            <li>Enterprise</li>
          </ul>
        </div>
        <div className="footparts">
          <h3>Resources</h3>
          <ul>
            <li>Blog</li>
            <li>Use Cases</li>
            <li>Webinars</li>
            <li>Videos</li>
            <li>Help Center</li>
            <li>Better Meetings Guide</li>
            <li>Download Switcher</li>
            <li>Product News</li>
          </ul>
        </div>
        <div className="footparts">
          <h3>Company</h3>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Customers</li>
            <li>Security</li>
            <li>ISO, SOC2</li>
            <li>Legal</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Footer