import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import '../styles/footer.css'

export default function Footer(){
  return (
    <footer className="app-footer">
      <div className="container py-5">
        <div className="card footer-card glass p-4">
          <div className="row g-4 align-items-start">
            <div className="col-12 col-md-4">
              <div className="footer-brand">
                <h4 className="mb-1">SkillSwap Hub</h4>
                <p className="small text-muted mb-0">Connect, learn, and grow through skill exchange.</p>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <h6 className="footer-heading">Quick Links</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/home" className="footer-link">Home</Link></li>
                <li><Link to="/explore" className="footer-link">Explore</Link></li>
                <li><Link to="/requests" className="footer-link">Requests</Link></li>
                <li><Link to="/about" className="footer-link">About</Link></li>
                <li><Link to="/profile" className="footer-link">Profile</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-3">
              <h6 className="footer-heading">Contact</h6>
              <div className="d-flex gap-3 mt-2">
                <a className="social-icon" href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a className="social-icon" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a className="social-icon" href="mailto:skillswaphub@gmail.com" aria-label="Email">
                  <FiMail />
                </a>
              </div>

              <div className="mt-3 small text-muted">
                <div>Mail : <a href="mailto:skillswaphub@gmail.com" className="footer-link">abiniveshk@gmail.com</a></div>
            
                <div className="mt-1">Mon–Sat • 8:00–22:00</div>
              </div>
            </div>
          </div>           

          <hr className="footer-divider" />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 pt-3">
            <div className="small text-muted">© 2026 SkillSwap Hub</div>
            <div className="small text-muted">Built with React + Bootstrap</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
