import React from 'react'
import Avatar from './Avatar'

export default function ProfileCard({user}){
  return (
    <div className="card glass mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <Avatar src={user.avatar} alt="avatar" className="rounded-circle me-3" width="80" height="80" />
          <div>
            <h5 className="mb-0">{user.name}</h5>
            <small className="text-muted">{user.college} • {user.experience}</small>
            <p className="small mb-2 mt-2">{user.bio}</p>
            <div className="small text-muted mb-2"><strong>Skills Known:</strong> {user.offered.join(', ')}</div>
            <div className="small text-muted mb-2"><strong>Wants to Learn:</strong> {user.wanted.join(', ')}</div>
            <div className="small text-muted mb-2"><strong>Availability:</strong> {user.availability}</div>
            <div className="small text-muted mb-2"><strong>Rating:</strong> {user.rating} ★</div>
            <div className="mt-2">
              {user.badges.map(b=> (<span key={b} className="badge bg-secondary me-1">{b}</span>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
