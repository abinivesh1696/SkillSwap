import React, { useEffect, useMemo, useState } from 'react'
import studentsData from '../data/students'
import { DEFAULT_AVATAR } from '../constants/avatarConstants'
import SkillCard from '../components/SkillCard'
import SwapRequestModal from '../components/SwapRequestModal'
import ContactModal from '../components/ContactModal'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const categories = ['All','Programming','Design','Video Editing','AI Tools','Marketing','Communication']

function mapRegisteredUserToProfile(u){
  return {
    id: `u-${u.id}`,
    name: u.name,
    college: u.college || 'Independent Learner',
    avatar: u.avatar || DEFAULT_AVATAR,
    offered: Array.isArray(u.skillsKnown) ? u.skillsKnown : [],
    wanted: Array.isArray(u.skillsWant) ? u.skillsWant : [],
    experience: u.experience || 'Beginner',
    rating: typeof u.rating === 'number' ? u.rating : 4.3,
    availability: u.availability || 'Flexible',
    bio: u.bio || 'New member on SkillSwap Hub.',
    completed: u.completed || 0,
    badges: u.badges || ['New Member'],
    contact: {
      email: u.email || 'not-provided@example.com',
      phone: u.phone || 'Not provided',
      linkedin: u.linkedin || 'https://www.linkedin.com'
    }
  }
}

export default function Explore(){
  const { user } = useAuth()
  const [students, setStudents] = useState([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [favorites, setFavorites] = useState(()=> JSON.parse(localStorage.getItem('ss-favs')||'[]'))
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [contactStudent, setContactStudent] = useState(null)
  const [catOpen, setCatOpen] = useState(false)
  const ddRef = React.useRef(null)
  useEffect(()=>{
    function onDoc(e){
      if(ddRef.current && !ddRef.current.contains(e.target)) setCatOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return ()=> document.removeEventListener('mousedown', onDoc)
  },[])

  useEffect(()=>{
    const registered = JSON.parse(localStorage.getItem('ss-users') || '[]')
    const registeredProfiles = registered.map(mapRegisteredUserToProfile)
    setStudents([...registeredProfiles, ...studentsData])
  },[])
  useEffect(()=> localStorage.setItem('ss-favs', JSON.stringify(favorites)),[favorites])

  const filtered = useMemo(()=> students.filter(s=>{
    if(cat!=='All'){
      if(!s.offered.concat(s.wanted).join(' ').toLowerCase().includes(cat.toLowerCase())) return false
    }
    if(q.trim()==='') return true
    return (s.name+s.offered.join(' ')+s.wanted.join(' ')+s.college).toLowerCase().includes(q.toLowerCase())
  }),[students, q, cat])

  function toggleFav(id){
    const student = students.find(s => s.id === id)
    const studentName = student ? student.name : 'Student'
    setFavorites(prev=> {
      const exists = prev.includes(id)
      if (exists) {
        toast.info(`Removed ${studentName} from favorites`)
        return prev.filter(x=>x!==id)
      } else {
        toast.success(`Added ${studentName} to favorites!`)
        return [...prev,id]
      }
    })
  }

  function openRequestModal(student){
    setSelectedStudent(student)
  }

  function closeRequestModal(){
    setSelectedStudent(null)
  }

  function openContactModal(student){
    setContactStudent(student)
  }

  function closeContactModal(){
    setContactStudent(null)
  }

  function submitRequest(payload){
    const request = {
      id: Date.now().toString(),
      sender: user?.name || 'You',
      receiver: selectedStudent?.name || 'Unknown',
      offered: payload.offeredSkill,
      requested: payload.requestedSkill,
      message: payload.message || 'Interested in a skill swap.',
      status: 'Pending'
    }
    const existing = JSON.parse(localStorage.getItem('ss-requests') || '[]')
    localStorage.setItem('ss-requests', JSON.stringify([request, ...existing]))
    setSelectedStudent(null)
    toast.success(`Request sent to ${request.receiver}`)
  }

  return (
    <section className="container py-5" id="explore">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Explore Students</h3>
        <div className="small text-muted">Results: {filtered.length}</div>
      </div>

      <div className="row mb-3 g-2">
        <div className="col-md-6">
          <input className="form-control" placeholder="Search name, skill, college..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="col-md-3">
          <div className="explore-dd" ref={ddRef}>
            <button type="button" className="btn btn-outline-light w-100 d-flex justify-content-between align-items-center" onClick={()=>setCatOpen(o=>!o)} aria-expanded={catOpen}>
              <span>{cat}</span>
              <i className="bi bi-chevron-down"></i>
            </button>
            {catOpen && (
              <div className="category-dropdown mt-2">
                {categories.map(c=> (
                  <button key={c} type="button" className={`dropdown-item btn btn-sm text-start ${c===cat? 'active': ''}`} onClick={()=>{setCat(c); setCatOpen(false)}}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        {filtered.map(s=> (
          <SkillCard key={s.id} p={s} onFavorite={toggleFav} onRequest={openRequestModal} onContact={openContactModal} />
        ))}
      </div>

      <SwapRequestModal target={selectedStudent} onClose={closeRequestModal} onSubmit={submitRequest} />
      <ContactModal target={contactStudent} onClose={closeContactModal} />
    </section>
  )
}
