import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import students from '../data/students'
import { useAuth } from '../context/AuthContext'
import { DEFAULT_AVATAR } from '../constants/avatarConstants'
import Avatar from '../components/Avatar'
import { toast } from 'react-toastify'

/* ── helpers ─────────────────────────────────────────────── */

function normalizeUser(raw) {
  if (!raw) return null
  return {
    id:           raw.id,
    name:         raw.name         || 'SkillSwap User',
    email:        raw.email        || '',
    college:      raw.college      || 'Independent Learner',
    bio:          raw.bio          || 'No bio added yet.',
    avatar:       raw.avatar       || DEFAULT_AVATAR,
    offered:      Array.isArray(raw.offered)     ? raw.offered     : (Array.isArray(raw.skillsKnown) ? raw.skillsKnown : []),
    wanted:       Array.isArray(raw.wanted)      ? raw.wanted      : (Array.isArray(raw.skillsWant)  ? raw.skillsWant  : []),
    experience:   raw.experience   || 'Beginner',
    availability: raw.availability || 'Flexible',
    rating:       typeof raw.rating === 'number' ? raw.rating : 4.3,
    completed:    raw.completed    ?? 0,
    badges:       raw.badges       || ['New Member'],
    contact:      raw.contact      || {},
    createdAt:    raw.createdAt    || raw.id,      // id is Date.now() for registered users
  }
}

function formatJoinDate(ts) {
  const num = Number(ts)
  if (!num || isNaN(num)) return 'Recently'
  return new Date(num).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/* deterministic skill level from name length – avoids random flicker on re-render */
function skillLevel(skillName) {
  let hash = 0
  for (let i = 0; i < skillName.length; i++) hash = (hash * 31 + skillName.charCodeAt(i)) | 0
  return 30 + Math.abs(hash) % 61           // 30 – 90 %
}

/* ── stat counter hook ───────────────────────────────────── */

function useCounter(target, duration = 900) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!target) { setVal(0); return }
    let start = 0
    const step = Math.max(1, Math.round(target / (duration / 16)))
    const id = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(id) }
      else setVal(start)
    }, 16)
    return () => clearInterval(id)
  }, [target, duration])
  return val
}

/* ── main component ──────────────────────────────────────── */

export default function Profile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: authUser, logout, updateUser } = useAuth()

  /* ── resolve which profile to show ── */
  const [profileData, setProfileData] = useState(null)
  const [isOwn, setIsOwn] = useState(false)

  useEffect(() => {
    // 1. Try static student data
    const fromStudents = students.find(s => s.id === id)
    if (fromStudents) {
      setProfileData(normalizeUser(fromStudents))
      setIsOwn(false)
      return
    }
    // 2. Try registered users in localStorage
    const registered = JSON.parse(localStorage.getItem('ss-users') || '[]')
    const fromRegistered = registered.find(u => u.id === id)
    if (fromRegistered) {
      const own = authUser && authUser.id === fromRegistered.id
      setProfileData(normalizeUser(fromRegistered))
      setIsOwn(own)
      return
    }
    // 3. Fallback: if the id matches the logged-in user
    if (authUser && authUser.id === id) {
      setProfileData(normalizeUser(authUser))
      setIsOwn(true)
      return
    }
    // 4. Last resort: show the logged-in user's own profile anyway
    if (authUser) {
      setProfileData(normalizeUser(authUser))
      setIsOwn(true)
    }
  }, [id, authUser])

  /* ── edit mode ── */
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})

  function startEdit() {
    setForm({
      name:         profileData.name,
      college:      profileData.college,
      bio:          profileData.bio,
      availability: profileData.availability,
      offered:      profileData.offered.join(', '),
      wanted:       profileData.wanted.join(', '),
    })
    setEditing(true)
  }

  function cancelEdit() { setEditing(false) }

  function saveEdit(e) {
    e.preventDefault()
    const updates = {
      name:         form.name.trim() || profileData.name,
      college:      form.college.trim() || profileData.college,
      bio:          form.bio.trim() || profileData.bio,
      availability: form.availability.trim() || profileData.availability,
      skillsKnown:  form.offered.split(',').map(s => s.trim()).filter(Boolean),
      skillsWant:   form.wanted.split(',').map(s => s.trim()).filter(Boolean),
    }
    const res = updateUser(updates)
    if (res.ok) {
      setProfileData(prev => normalizeUser({ ...prev, ...updates, offered: updates.skillsKnown, wanted: updates.skillsWant }))
      setEditing(false)
      toast.success('Profile updated!')
    }
  }

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /* ── stats from localStorage ── */
  const stats = useMemo(() => {
    const requests = JSON.parse(localStorage.getItem('ss-requests') || '[]')
    const userName = profileData?.name || ''
    return {
      sent:     requests.filter(r => r.sender === userName).length,
      received: requests.filter(r => r.receiver === userName).length,
      accepted: requests.filter(r => (r.sender === userName || r.receiver === userName) && r.status === 'Accepted').length,
    }
  }, [profileData])

  const sentCount     = useCounter(stats.sent)
  const receivedCount = useCounter(stats.received)
  const acceptedCount = useCounter(stats.accepted)

  /* ── guard ── */
  if (!profileData) {
    return (
      <section className="container py-5 text-center">
        <div className="card glass p-5">
          <h4 className="mb-3">Profile not found</h4>
          <p className="text-muted">We couldn't locate this profile. It may have been removed.</p>
          <button className="btn btn-primary mx-auto" style={{width:'fit-content'}} onClick={() => navigate('/explore')}>Browse Students</button>
        </div>
      </section>
    )
  }

  /* ── render ─────────────────────────────────────────────── */
  return (
    <section className="container py-5">

      {/* ── header card ── */}
      <div className="card glass profile-header mb-4">
        <div className="profile-header-gradient"></div>
        <div className="card-body profile-header-body">
          <div className="profile-avatar-wrap">
            <Avatar
              src={profileData.avatar}
              alt={profileData.name}
              className="rounded-circle profile-avatar-img"
              width="120"
              height="120"
            />
            <span className="profile-status-dot"></span>
          </div>

          <div className="profile-header-info">
            <h3 className="fw-bold mb-1">{profileData.name}</h3>
            <p className="text-muted mb-1">
              {profileData.college}
              {profileData.email ? ` • ${profileData.email}` : ''}
            </p>
            <p className="small text-muted mb-2">
              <span className="me-3">📅 Joined {formatJoinDate(profileData.createdAt)}</span>
              <span className="me-3">⏰ {profileData.availability}</span>
              <span>⭐ {profileData.rating}</span>
            </p>
            <div className="d-flex flex-wrap gap-1">
              {profileData.badges.map(b => (
                <span key={b} className="badge profile-badge">{b}</span>
              ))}
              <span className="badge profile-badge-xp">{profileData.experience}</span>
            </div>
          </div>

          {isOwn && (
            <div className="profile-header-actions">
              {!editing && (
                <button className="btn btn-primary btn-sm" onClick={startEdit}>✏️ Edit Profile</button>
              )}
              <button className="btn btn-ghost btn-sm" onClick={() => { logout(); navigate('/login') }}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* ── edit form (inline) ── */}
      {editing && (
        <div className="card glass p-4 mb-4 profile-edit-card">
          <h5 className="mb-3">Edit Profile</h5>
          <form onSubmit={saveEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small">Name</label>
                <input className="form-control" name="name" value={form.name} onChange={onChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small">College / Institution</label>
                <input className="form-control" name="college" value={form.college} onChange={onChange} />
              </div>
              <div className="col-12">
                <label className="form-label small">Bio</label>
                <textarea className="form-control" name="bio" rows="2" value={form.bio} onChange={onChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Skills Known (comma separated)</label>
                <input className="form-control" name="offered" value={form.offered} onChange={onChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Wants to Learn (comma separated)</label>
                <input className="form-control" name="wanted" value={form.wanted} onChange={onChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Availability</label>
                <input className="form-control" name="availability" value={form.availability} onChange={onChange} />
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-primary btn-sm">💾 Save Changes</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* ── stats row ── */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Requests Sent',     value: sentCount,     icon: '📤', color: 'stat-blue' },
          { label: 'Requests Received',  value: receivedCount, icon: '📥', color: 'stat-purple' },
          { label: 'Completed Swaps',    value: acceptedCount, icon: '✅', color: 'stat-green' },
        ].map(s => (
          <div className="col-sm-4" key={s.label}>
            <div className="card glass p-3 text-center hover-scale h-100">
              <div className="profile-stat-icon">{s.icon}</div>
              <div className={`profile-stat-number gradient-text`}>{s.value}</div>
              <div className="small text-muted">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── about + skills ── */}
      <div className="row g-4">

        {/* left column — about & learning goals */}
        <div className="col-lg-5">
          <div className="card glass p-4 mb-4 h-100">
            <h5 className="mb-3">About</h5>
            <p className="text-muted">{profileData.bio}</p>

            <h6 className="mt-4 mb-2">🎯 Learning Goals</h6>
            <div className="d-flex flex-wrap gap-2">
              {profileData.wanted.length > 0 ? profileData.wanted.map(w => (
                <span key={w} className="badge profile-badge-want">{w}</span>
              )) : (
                <span className="text-muted small">None specified yet</span>
              )}
            </div>

            <h6 className="mt-4 mb-2">📊 Quick Stats</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-1">⭐ Rating: <strong>{profileData.rating}</strong></li>
              <li className="mb-1">🔄 Completed Swaps: <strong>{profileData.completed}</strong></li>
              <li className="mb-1">📅 Joined: <strong>{formatJoinDate(profileData.createdAt)}</strong></li>
            </ul>
          </div>
        </div>

        {/* right column — skills with progress bars */}
        <div className="col-lg-7">
          <div className="card glass p-4 h-100">
            <h5 className="mb-3">🛠️ Skills Known</h5>
            {profileData.offered.length > 0 ? profileData.offered.map(s => (
              <div className="mb-3" key={s}>
                <div className="d-flex justify-content-between mb-1">
                  <span className="small fw-semibold">{s}</span>
                  <span className="small text-muted">{skillLevel(s)}%</span>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${skillLevel(s)}%`, transition: 'width 1s ease' }}
                  ></div>
                </div>
              </div>
            )) : (
              <p className="text-muted small">No skills listed yet.</p>
            )}

            {/* contact info – only shown for others or for self */}
            {profileData.contact?.email && (
              <>
                <hr style={{ borderColor: 'var(--glass-border)' }} />
                <h6 className="mt-3 mb-2">📬 Contact</h6>
                <ul className="list-unstyled small text-muted">
                  {profileData.contact.email && <li className="mb-1">📧 <a href={`mailto:${profileData.contact.email}`}>{profileData.contact.email}</a></li>}
                  {profileData.contact.phone && <li className="mb-1">📱 {profileData.contact.phone}</li>}
                  {profileData.contact.linkedin && <li className="mb-1">🔗 <a href={profileData.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile</a></li>}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

    </section>
  )
}
