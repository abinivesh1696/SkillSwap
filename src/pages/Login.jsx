import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  function handleSubmit(e) {
    e.preventDefault()
    const res = login(email, password)
    if (!res.ok) {
      toast.error(res.message)
      return
    }
    toast.success('Welcome back!')
    navigate('/dashboard')
  }

  return (
    <section className="container py-5 auth-wrap">
      <div className="card glass auth-card p-4">
        <h3 className="mb-3">Login</h3>
        <p className="small text-muted mb-4">Sign in to access your dashboard, requests, and contacts.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        <p className="small mt-3 mb-0">New user? <Link to="/register">Create account</Link></p>
      </div>
    </section>
  )
}
