import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext.jsx'
import Decor from '../components/Decor.jsx'
import { loadMoodHistory, saveMoodEntry } from '../store/moodSlice.js'

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy', msg: 'Your happiness is contagious — let it bloom today. 🌷' },
  { emoji: '😌', label: 'Calm', value: 'calm', msg: 'Peaceful moments like this are worth savoring. ☁️' },
  { emoji: '😐', label: 'Okay', value: 'okay', msg: 'Okay is a perfectly good place to be. Be gentle with yourself. 🌾' },
  { emoji: '😔', label: 'Low', value: 'low', msg: 'It’s alright to not be alright. This feeling will pass. 🤍' },
  { emoji: '😣', label: 'Anxious', value: 'anxious', msg: 'You’re safe right now. Try a slow breath with me. 🌬' },
]

function Mood() {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const moodState = useSelector((state) => state.mood)
  const history = moodState.userId === currentUser?.id ? moodState.history : []
  const loading = moodState.userId === currentUser?.id ? moodState.loading : true
  const saving = moodState.saving
  const error = moodState.userId === currentUser?.id ? moodState.error : ''
  const [selected, setSelected] = useState(null)
  const current = moods.find((m) => m.value === selected)

  useEffect(() => {
    if (currentUser) {
      dispatch(loadMoodHistory(currentUser.id))
      setSelected(null)
    }
  }, [dispatch, currentUser])

  function handleMoodSelect(value) {
    setSelected(value)
    if (currentUser) dispatch(saveMoodEntry({ userId: currentUser.id, mood: value }))
  }

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
                onClick={() => handleMoodSelect(m.value)}
                disabled={saving}
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
          {saving && <p role="status">Saving your mood…</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
        </div>

        <div className="journal-entries" style={{ maxWidth: 760, margin: '32px auto 0' }}>
          <h3>Recent check-ins</h3>
          {loading ? (
            <p className="journal-empty" role="status">Loading your mood history…</p>
          ) : history.length === 0 ? (
            <p className="journal-empty">Your saved mood check-ins will appear here.</p>
          ) : (
            history.slice(0, 5).map((entry) => {
              const mood = moods.find((item) => item.value === entry.mood)
              return (
                <article className="about-card journal-entry" key={entry.id}>
                  <div className="journal-entry-top">
                    <h3>{mood ? `${mood.emoji} ${mood.label}` : entry.mood}</h3>
                    <small>{new Date(entry.createdAt).toLocaleString()}</small>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}

export default Mood
