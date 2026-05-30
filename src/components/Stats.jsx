import React, { useEffect, useState } from 'react'

function useCounter(target, duration=1200){
  const [val, setVal] = useState(0)
  useEffect(()=>{
    let start = 0
    const step = Math.max(1, Math.round(target / (duration/16)))
    const id = setInterval(()=>{
      start += step
      if(start >= target){ setVal(target); clearInterval(id) }
      else setVal(start)
    },16)
    return ()=> clearInterval(id)
  },[target,duration])
  return val
}

export default function Stats(){
  const s1 = useCounter(1240,1400)
  const s2 = useCounter(820,1400)
  const s3 = useCounter(98,1400)

  return (
    <section className="py-5">
      <div className="card glass p-4">
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="stat gradient-text">{s1}+</div>
            <div className="stat-small">Students</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="stat gradient-text">{s2}+</div>
            <div className="stat-small">Swaps Completed</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="stat gradient-text">{s3}%</div>
            <div className="stat-small">Avg Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
