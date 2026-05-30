import React from 'react'

export default function RequestCard({r, onAccept, onReject}){
  return (
    <div className="card glass mb-3">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h6>{r.sender}</h6>
          <p className="mb-1 small text-muted"><strong>Offers:</strong> {r.offered} • <strong>Requests:</strong> {r.requested}</p>
          <p className="mb-1">{r.message}</p>
          <span className={`badge ${r.status==='Pending'? 'bg-warning text-dark' : r.status==='Accepted'? 'bg-success' : 'bg-danger'}`}>{r.status}</span>
        </div>
        <div className="btn-group-vertical">
          <button className="btn btn-sm btn-success" onClick={()=>onAccept(r.id)}>Accept</button>
          <button className="btn btn-sm btn-danger" onClick={()=>onReject(r.id)}>Reject</button>
        </div>
      </div>
    </div>
  )
}
