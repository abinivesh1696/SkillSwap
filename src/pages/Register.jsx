import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DEFAULT_AVATAR } from '../constants/avatarConstants'
import { toast } from 'react-toastify'

export default function Register() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    bio: '',
    skillsKnown: '',
    skillsWant: '',
    availability: ''
  })

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const profile = {
      ...form,
      skillsKnown: form.skillsKnown.split(',').map((s) => s.trim()).filter(Boolean),
      skillsWant: form.skillsWant.split(',').map((s) => s.trim()).filter(Boolean),
      avatar: DEFAULT_AVATAR
    }

    const res = register(profile)
    if (!res.ok) {
      toast.error(res.message)
      return
    }
    toast.success(`Account created! Welcome, ${profile.name}!`)
    navigate('/dashboard')
  }

  return (
    <section className="container py-5 auth-wrap">
      <div className="card glass auth-card p-4">
        <h3 className="mb-3">Register</h3>
        <p className="small text-muted mb-4">Create your profile to start learning and teaching through swaps.</p>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">College</label>
              <input className="form-control" name="college" value={form.college} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control" type="email" name="email" value={form.email} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input className="form-control" type="password" name="password" value={form.password} onChange={onChange} required />
            </div>
            <div className="col-12">
              <label className="form-label">Bio</label>
              <textarea className="form-control" rows="2" name="bio" value={form.bio} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Skills You Know (comma separated)</label>
              <input className="form-control" name="skillsKnown" value={form.skillsKnown} onChange={onChange} placeholder="React, Python" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Skills You Want (comma separated)</label>
              <input className="form-control" name="skillsWant" value={form.skillsWant} onChange={onChange} placeholder="Photoshop, Marketing" required />
            </div>
            <div className="col-12">
              <label className="form-label">Availability</label>
              <input className="form-control" name="availability" value={form.availability} onChange={onChange} placeholder="Evenings / Weekends" required />
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-3" type="submit">Create Account</button>
        </form>

        <p className="small mt-3 mb-0">Already registered? <Link to="/login">Login</Link></p>
      </div>
    </section>
  )
}
