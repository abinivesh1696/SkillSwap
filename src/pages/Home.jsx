import React from 'react'
import HeroSection from '../components/HeroSection'
import students from '../data/students'
import Stats from '../components/Stats'

function Features(){
  return (
    <div className="row gy-3">
      <div className="col-md-4">
        <div className="card glass p-3">
          <h6>Discover</h6>
          <p className="small text-muted">Search students by skills and categories.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card glass p-3">
          <h6>Swap</h6>
          <p className="small text-muted">Request swaps and build real experience.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card glass p-3">
          <h6>Grow</h6>
          <p className="small text-muted">Earn badges and share accomplishments.</p>
        </div>
      </div>
    </div>
  )
}

export default function Home(){
  return (
    <div>
      <HeroSection />
      <section className="container py-5">
        <h3 className="mb-3">Features</h3>
        <Features />

        <h3 className="mt-5">Trending Skills</h3>
        <div className="row gy-3 mt-2">
          {students.slice(0,4).map(s=> (
            <div className="col-md-3" key={s.id}>
              <div className="card glass p-3">
                <h6 className="mb-1">{s.offered[0]}</h6>
                <small className="text-muted">{s.name} • {s.rating}★</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container">
        <Stats />
      </div>
    </div>
  )
}
