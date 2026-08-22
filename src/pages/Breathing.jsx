import { useState, useEffect } from 'react'
import Decor from '../components/Decor.jsx'

const phases = [
  { label: 'Breathe In', cls: 'in' },
  { label: 'Hold', cls: 'hold' },
  { label: 'Breathe Out', cls: 'out' },
]

function Breathing() {
  const [active, setActive] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)

  // Advances the breathing phase every 4 seconds, only while active
  useEffect(() => {
    if (!active) return

    const timer = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [active])

  function toggleStart() {
    if (!active) setPhaseIndex(0)
    setActive(!active)
  }

  const phase = phases[phaseIndex]

  return (
    <div className="page">
      <Decor />
      <section className="breathing-wrap container">
        <h2 className="section-title">Let’s breathe together</h2>
        <p className="section-sub">Follow the circle. In for 4, hold for 4, out for 4.</p>

        <div className={`breath-circle ${active ? phase.cls : ''}`}>
          {active ? phase.label : 'Ready?'}
        </div>

        <button className="btn btn-primary" style={{ marginTop: 40 }} onClick={toggleStart}>
          {active ? '⏸ Stop' : '🌬 Start Breathing'}
        </button>
      </section>
    </div>
  )
}

export default Breathing
