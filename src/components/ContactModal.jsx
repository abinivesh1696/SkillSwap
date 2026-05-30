import React from 'react'

export default function ContactModal({ target, onClose }) {
  if (!target) return null

  return (
    <div className="swap-modal-backdrop" role="dialog" aria-modal="true">
      <div className="swap-modal card glass p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Contact {target.name}</h5>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>Close</button>
        </div>

        <p className="small text-muted mb-3">Use these contact details for more information about skill exchange.</p>

        <div className="mb-2"><strong>Email:</strong> <a href={`mailto:${target.contact?.email}`}>{target.contact?.email}</a></div>
        <div className="mb-2"><strong>Phone:</strong> <a href={`tel:${target.contact?.phone}`}>{target.contact?.phone}</a></div>
        <div className="mb-3"><strong>LinkedIn:</strong> <a href={target.contact?.linkedin} target="_blank" rel="noreferrer">Profile Link</a></div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  )
}
