import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

export default function SkillCard({p, onFavorite, onRequest, onContact}){
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card glass h-100 hover-scale">
        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-center mb-3">
            <Avatar src={p.avatar} alt="avatar" className="rounded-circle me-3" width="60" height="60" />
            <div>
              <h6 className="mb-0">{p.name}</h6>
              <small className="text-muted">{p.college}</small>
            </div>
          </div>

          <p className="small mb-2">{p.bio}</p>

          <div className="mb-2">
            <strong>Skills Known:</strong>
            <div className="small text-muted">{p.offered.join(', ')}</div>
          </div>

          <div className="mb-2">
            <strong>Wants to Learn:</strong>
            <div className="small text-muted">{p.wanted.join(', ')}</div>
          </div>

          <div className="small text-muted mb-2">
            <strong>Availability:</strong> {p.availability}
          </div>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-info text-dark me-2">{p.experience}</span>
              <span className="text-warning">★ {p.rating}</span>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-light me-2" onClick={()=>onFavorite(p.id)}>❤</button>
              <button className="btn btn-sm btn-primary me-2" onClick={()=>onRequest(p)}>Request Swap</button>
              <button className="btn btn-sm btn-ghost me-2" onClick={()=>onContact(p)}>Contact</button>
              <Link to={`/profile/${p.id}`} className="btn btn-sm btn-ghost">View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
