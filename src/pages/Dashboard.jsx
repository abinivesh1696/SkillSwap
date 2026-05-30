import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <section className="container py-5">
      <div className="card glass p-4 mb-4">
        <h2 className="mb-2">Welcome, {user?.name}</h2>
        <p className="text-muted mb-3">This is your profile dashboard. Start exploring students, send swap requests, and contact mentors for more information.</p>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card glass p-3 h-100">
              <h6>College</h6>
              <div className="small">{user?.college}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card glass p-3 h-100">
              <h6>Skills Known</h6>
              <div className="small">{Array.isArray(user?.skillsKnown) ? user.skillsKnown.join(', ') : '-'}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card glass p-3 h-100">
              <h6>Availability</h6>
              <div className="small">{user?.availability || '-'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <Link className="btn btn-primary" to="/explore">Explore Skills</Link>
        <Link className="btn btn-ghost" to="/requests">View Requests</Link>
      </div>
    </section>
  )
}
