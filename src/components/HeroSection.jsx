import React, { useEffect, useState } from 'react'

export default function HeroSection(){
  const [typed, setTyped] = useState('')
  const phrases = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Photoshop', 'Python', 'AI Tools']
  useEffect(()=>{
    let idx = 0
    let i = 0
    let forward=true
    let current = ''
    const tick = ()=>{
      const full = phrases[idx]
      if(forward){
        current = full.slice(0, i+1)
        setTyped(current)
        i++
        if(i===full.length){ forward=false; setTimeout(tick,900); return }
      } else {
        i--
        current = full.slice(0, i)
        setTyped(current)
        if(i===0){ forward=true; idx=(idx+1)%phrases.length }
      }
      setTimeout(tick, forward?120:60)
    }
    const id = setTimeout(tick,300)
    return ()=> clearTimeout(id)
  },[])

  return (
    <section className="hero py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold"><span className="gradient-text">Learn Skills</span> By <span className="gradient-text">Sharing Skills</span></h1>
            <p className="lead text-muted">Connect with students and exchange knowledge without paying for expensive courses.</p>
            <div className="mt-4 d-flex gap-2">
              <a href="#explore" className="btn btn-primary btn-glow me-2">Explore Skills</a>
            </div>
            <div className="mt-3 small text-muted">Trending: <span className="gradient-text">{typed}</span><span className="text-muted">▌</span></div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="floating-card glass p-4">
              <h5 className="mb-3">Top Categories</h5>
              <div className="d-flex gap-2 flex-wrap">
                <div className="badge bg-secondary text-dark">Programming</div>
                <div className="badge bg-secondary text-dark">Design</div>
                <div className="badge bg-secondary text-dark">AI Tools</div>
                <div className="badge bg-secondary text-dark">Web Development</div>
                <div className="badge bg-secondary text-dark">Mobile Development</div>
                <div className="badge bg-secondary text-dark">Node.js</div>
                <div className="badge bg-secondary text-dark">JavaScript</div>
                <div className="badge bg-secondary text-dark">TypeScript</div>
                <div className="badge bg-secondary text-dark">Python</div>
                <div className="badge bg-secondary text-dark">React</div>
                <div className="badge bg-secondary text-dark">Video Editing</div>
                <div className="badge bg-secondary text-dark">Photography</div>
                <div className="badge bg-secondary text-dark">Digital Marketing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
