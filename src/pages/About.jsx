import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/about.css'

const features = [
  { icon: 'bi-people-fill', title: 'Peer Learning', desc: 'Connect with students to share and learn new skills.' },
  { icon: 'bi-arrow-repeat', title: 'Swap Sessions', desc: 'Schedule skill swaps and collaborate in practice sessions.' },
  { icon: 'bi-trophy-fill', title: 'Earn Cred', desc: 'Build reputation through helpful exchanges.' },
  { icon: 'bi-shield-lock-fill', title: 'Secure & Private', desc: 'Safe profiles and secure messaging for students.' },
]

const techs = [
  'React', 'Bootstrap 5', 'Vite', 'Firebase', 'Axios', 'Bootstrap Icons'
]

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-3">
      <div className="card feature-card h-100 p-3">
        <div className="icon-wrap mb-3">
          <i className={`bi ${icon} feature-icon`}></i>
        </div>
        <h5 className="fw-bold">{title}</h5>
        <p className="muted mb-0">{desc}</p>
      </div>
    </div>
  )
}

function TechBadge({ name }) {
  return <span className="badge tech-badge me-2 mb-2">{name}</span>
}

function DevCard() {
  return (
    <div className="card dev-card p-3 d-flex align-items-center gap-3">
      <img src="https://i.pravatar.cc/128?img=12" alt="dev" className="dev-avatar" />
      <div>
        <div className="fw-bold">Alex Morgan</div>
        <div className="muted small">Fullstack Developer • SkillSwap Hub</div>
        <div className="mt-2 d-flex gap-2">
          <a href="#" className="text-decoration-none link-glow"><i className="bi bi-github"></i></a>
          <a href="#" className="text-decoration-none link-glow"><i className="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  useEffect(() => {
    const id = 'bs-icons-css'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css'
      document.head.appendChild(link)
    }
  }, [])

  return (
    <div className="about-page">
      <div className="bg-glow"></div>
      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="glass-card w-100">
            <div className="row align-items-center">
              <div className="col-md-7">
                <h1 className="display-5 fw-bold heading">SkillSwap Hub</h1>
                <p className="lead muted mb-4">A student-first skill exchange platform — learn, teach, and grow together. Connect with peers, swap sessions, and build your portfolio through collaborative learning.</p>
                <div className="d-flex gap-3 flex-wrap mb-4">
                  <Link to="/explore" className="btn btn-primary btn-glow">Explore Skills</Link>
                  <a href="#features" className="btn btn-outline-light">See Features</a>
                </div>

                <div className="row mt-3">
                  <div className="col-6 mb-3">
                    <div className="stat">
                      <div className="stat-value">1.2k+</div>
                      <div className="muted small">Active Students</div>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="stat">
                      <div className="stat-value">3.8k</div>
                      <div className="muted small">Skill Exchanges</div>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>

        <section id="features" className="mt-5">
          <h3 className="fw-bold mb-3">Features</h3>
          <p className="muted mb-4">Designed to make student skill-sharing simple, safe, and social.</p>
          <div className="row">
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </section>

        <section id="tech" className="mt-5">
          <h3 className="fw-bold mb-3">Technologies</h3>
          <p className="muted mb-3">Built with a modern frontend stack and fast tooling.</p>
          <div className="mb-3">
            {techs.map((t, i) => <TechBadge key={i} name={t} />)}
          </div>
        </section>

        <section id="mission" className="mt-5 row align-items-center">
          <div className="col-md-6 mb-3">
            <div className="card p-3">
              <h5 className="fw-bold">Our Mission</h5>
              <p className="muted mb-0">Empower students to share knowledge, Practice skills, and Build confidence through collaborative exchanges with oothers.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card p-3">
              <h5 className="fw-bold">Our Vision</h5>
              <p className="muted mb-0">A global community where peer-to-peer learning is accessible, equitable, and engaging.</p>
            </div>
          </div>
        </section>


        <div style={{height: '48px'}}></div>
      </div>
    </div>
  )
}
