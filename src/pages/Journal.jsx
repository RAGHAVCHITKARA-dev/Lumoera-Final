import { useState } from 'react'
import Decor from '../components/Decor.jsx'

const moods = ['😊', '😌', '😐', '😔', '😣']

const initialTasks = [
  { id: 1, text: 'Drink a glass of water', done: false },
  { id: 2, text: 'Take 5 deep breaths', done: false },
  { id: 3, text: 'Step outside for a minute', done: false },
  { id: 4, text: 'Write down one worry', done: false },
  { id: 5, text: 'Be kind to yourself today', done: false },
]

function Journal() {
  const [mood, setMood] = useState('')
  const [entry, setEntry] = useState('')
  const [saved, setSaved] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)
  const [gratitude, setGratitude] = useState('')
  const [intention, setIntention] = useState('')

  function toggleTask(id) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function handleSave() {
    setSaved(true)
  }

  return (
    <div className="page">
      <Decor />
      <section className="container" style={{ paddingTop: 50 }}>
        <div className="diary-page">
          <div className="washi" />
          <h2 className="diary-title">Dear Diary...</h2>
          <p style={{ textAlign: 'center', opacity: 0.7, marginTop: -8 }}>
            a soft page just for you ✿
          </p>

          {/* MOOD */}
          <div className="diary-field">
            <label>Today I feel...</label>
            <div className="mood-row" style={{ justifyContent: 'flex-start' }}>
              {moods.map((m) => (
                <button
                  key={m}
                  className={`mood-btn ${mood === m ? 'selected' : ''}`}
                  style={{ padding: '10px 14px', fontSize: 24 }}
                  onClick={() => setMood(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* ENTRY */}
          <div className="diary-field" style={{ marginTop: 24 }}>
            <label>Dear Diary...</label>
            <textarea
              className="diary-textarea"
              placeholder="Write whatever is on your mind, there is no wrong way to feel..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: 22 }}>
            <button className="btn btn-primary" onClick={handleSave}>💌 Save Entry</button>
            {saved && <p className="saved-msg">Your thoughts are safe here ♡</p>}
          </div>

          {/* GRATITUDE */}
          <div className="diary-field">
            <label>Today I’m grateful for...</label>
            <input
              className="diary-input"
              type="text"
              placeholder="a warm cup of tea, a kind message, sunlight..."
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
            />
          </div>

          {/* INTENTION */}
          <div className="diary-field">
            <label>My intention for today</label>
            <input
              className="diary-input"
              type="text"
              placeholder="I intend to be gentle with myself..."
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
            />
          </div>

          {/* CHECKLIST */}
          <div className="diary-field">
            <label>Little targets for today 🌷</label>
            <ul className="checklist">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={task.done ? 'done' : ''}
                  onClick={() => toggleTask(task.id)}
                >
                  <span className="checkbox">{task.done ? '✓' : ''}</span>
                  {task.text}
                </li>
              ))}
            </ul>
          </div>

          <p className="closing-note">You showed up today, and that’s enough. ♡</p>
        </div>
      </section>
    </div>
  )
}

export default Journal
