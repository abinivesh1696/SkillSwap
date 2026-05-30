import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar({theme, setTheme}){
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className={`navbar navbar-expand-lg glass px-3 ${theme==='dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to={isAuthenticated ? '/dashboard' : '/login'}>SkillSwap Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
          aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/explore">Explore</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/requests">Requests</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to={`/profile/${user?.id}`}>My Profile</NavLink></li>
                <li className="nav-item ms-lg-3 small text-muted">Hi, {user?.name}</li>
                <li className="nav-item ms-lg-2"><button className="btn btn-sm btn-ghost" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item ms-lg-2"><NavLink className="btn btn-sm btn-primary" to="/register">Register</NavLink></li>
              </>
            )}
            <li className="nav-item ms-3">
              <div className="form-check form-switch text-nowrap">
                <input className="form-check-input" type="checkbox" id="themeSwitch" checked={theme==='dark'} onChange={()=>setTheme(theme==='dark'? 'light':'dark')} />
                <label className="form-check-label" htmlFor="themeSwitch">Dark</label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
