import { useState } from 'react'
import Decor from '../components/Decor.jsx'

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy', msg: 'Your happiness is contagious — let it bloom today. 🌷' },
  { emoji: '😌', label: 'Calm', value: 'calm', msg: 'Peaceful moments like this are worth savoring. ☁️' },
  { emoji: '😐', label: 'Okay', value: 'okay', msg: 'Okay is a perfectly good place to be. Be gentle with yourself. 🌾' },
  { emoji: '😔', label: 'Low', value: 'low', msg: 'It’s alright to not be alright. This feeling will pass. 🤍' },
  { emoji: '😣', label: 'Anxious', value: 'anxious', msg: 'You’re safe right now. Try a slow breath with me. 🌬' },
]

function Mood() {
  const [selected, setSelected] = useState(null)
  const current = moods.find((m) => m.value === selected)

  return (
    <div className="page">
      <Decor />
      <section className="section container" style={{ paddingTop: 60 }}>
        <h2 className="section-title">How are you, really?</h2>
        <p className="section-sub">Pick the feeling closest to your heart right now.</p>

        <div className="journey-box">
          <div className="mood-row">
            {moods.map((m) => (
              <button
                key={m.value}
                className={`mood-btn ${selected === m.value ? 'selected' : ''}`}
                onClick={() => setSelected(m.value)}
              >
                {m.emoji}
                <span className="mood-label">{m.label}</span>
              </button>
            ))}
          </div>

          {current && (
            <p className="quote-box" style={{ marginTop: 26 }}>
              <span className="quote-text" style={{ fontSize: 19 }}>{current.msg}</span>
            </p>
          )}

          {!current && <p style={{ marginTop: 24, opacity: 0.7 }}>Your mood check-in will appear here ✿</p>}
        </div>
      </section>
    </div>
  )
}

export default Mood
