import React, { useEffect, useState } from 'react'

export default function SwapRequestModal({ target, onClose, onSubmit }) {
  const [offeredSkill, setOfferedSkill] = useState('')
  const [requestedSkill, setRequestedSkill] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!target) return
    setRequestedSkill(target.offered?.[0] || '')
    setOfferedSkill('')
    setMessage(`Hi ${target.name}, I would like to learn ${target.offered?.[0] || 'this skill'} from you.`)
  }, [target])

  if (!target) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!offeredSkill.trim() || !requestedSkill.trim()) return
    onSubmit({ offeredSkill: offeredSkill.trim(), requestedSkill: requestedSkill.trim(), message: message.trim() })
  }

  return (
    <div className="swap-modal-backdrop" role="dialog" aria-modal="true">
      <div className="swap-modal card glass p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Request Skill Swap</h5>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>Close</button>
        </div>

        <p className="small text-muted mb-3">Send a request to <strong>{target.name}</strong> from {target.college}.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">Skill You Offer</label>
            <input
              className="form-control"
              placeholder="Example: React Basics"
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Skill You Want to Learn</label>
            <select
              className="form-select"
              value={requestedSkill}
              onChange={(e) => setRequestedSkill(e.target.value)}
              required
            >
              {target.offered.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small">Message</label>
            <textarea
              className="form-control"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your swap request"
            />
          </div>

          <div className="d-flex gap-2 justify-content-end">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  )
}
