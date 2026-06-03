import React, { useEffect, useState } from 'react'
import RequestCard from '../components/RequestCard'
import { toast } from 'react-toastify'

export default function Requests(){
  const [requests, setRequests] = useState(()=> JSON.parse(localStorage.getItem('ss-requests')||'[]'))

  useEffect(()=>{
    localStorage.setItem('ss-requests', JSON.stringify(requests))
  },[requests])

  function accept(id){
    const req = requests.find(r => r.id === id)
    setRequests(prev=> prev.map(r=> r.id===id? {...r, status: 'Accepted'}:r))
    toast.success(`Accepted swap request from ${req ? req.sender : 'sender'}!`)
  }
  function reject(id){
    const req = requests.find(r => r.id === id)
    setRequests(prev=> prev.map(r=> r.id===id? {...r, status: 'Rejected'}:r))
    toast.info(`Rejected swap request from ${req ? req.sender : 'sender'}.`)
  }

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between mb-3">
        <h3>Swap Requests</h3>
      </div>
      {requests.length===0? <div className="card glass p-3">No requests yet</div> : requests.map(r=> (
        <RequestCard key={r.id} r={r} onAccept={accept} onReject={reject} />
      ))}
    </section>
  )
}
