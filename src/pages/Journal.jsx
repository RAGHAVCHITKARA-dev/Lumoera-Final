import { useState } from 'react'
import Decor from '../components/Decor.jsx'
import FormInput from '../components/FormInput.jsx'
import { useJournal } from '../context/JournalContext.jsx'

function Journal() {
  const { entries, loading, error, addEntry, deleteEntry, setError } = useJournal()
  const [title, setTitle] = useState('')
  const [thoughts, setThoughts] = useState('')
  const [mood, setMood] = useState('calm')
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    setNotice('')
    setError('')

    if (title.trim().length < 3) {
      setFormError('Please enter a title with at least 3 characters.')
      return
    }

    if (thoughts.trim().length < 10) {
      setFormError('Write at least 10 characters so you can reflect on your day.')
      return
    }

    const saved = addEntry({ title: title.trim(), thoughts: thoughts.trim(), mood })
    if (saved) {
      setTitle('')
      setThoughts('')
      setMood('calm')
      setNotice('Your reflection has been saved on this device. ✨')
    }
  }

  function handleDelete(id) {
    setNotice('')
    deleteEntry(id)
  }

  return (
    <div className="page">
      <Decor />
      <section className="section container journal-page" style={{ paddingTop: 60 }}>
        <h2 className="section-title">Your little journal</h2>
        <p className="section-sub">A quiet place to leave your thoughts, without judgement. ✿</p>

        <div className="journal-layout">
          <form className="about-card journal-form" onSubmit={handleSubmit} noValidate>
            <h3>Write a reflection</h3>
            <p className="journal-hint">Your entries are saved in this browser on this device.</p>

            <FormInput
              id="entry-title"
              label="Entry title"
              value={title}
              onChange={setTitle}
              placeholder="A small moment from today..."
              required
            />
            <FormInput
              id="entry-thoughts"
              label="Your thoughts"
              value={thoughts}
              onChange={setThoughts}
              placeholder="What's on your mind?"
              error={formError && thoughts.trim().length < 10 ? formError : ''}
              required
              multiline
            />

            <div className="form-field">
              <label htmlFor="entry-mood">How are you feeling?</label>
              <select id="entry-mood" value={mood} onChange={(event) => setMood(event.target.value)}>
                <option value="happy">😊 Happy</option>
                <option value="calm">😌 Calm</option>
                <option value="okay">😐 Okay</option>
                <option value="low">😔 Low</option>
                <option value="anxious">😣 Anxious</option>
              </select>
            </div>

            {formError && <p className="form-error" role="alert">{formError}</p>}
            {error && <p className="form-error" role="alert">{error}</p>}
            {notice && <p className="form-success" role="status">{notice}</p>}

            <button className="btn btn-primary" type="submit">🌷 Save reflection</button>
          </form>

          <div className="journal-entries">
            <h3>Past reflections</h3>
            {loading ? (
              <p className="journal-empty" role="status">Loading your reflections…</p>
            ) : entries.length === 0 ? (
              <p className="journal-empty">No entries yet. Your first reflection can start here. 🤍</p>
            ) : (
              entries.map((entry) => (
                <article className="about-card journal-entry" key={entry.id}>
                  <div className="journal-entry-top">
                    <div>
                      <span className="future-tag">{entry.mood}</span>
                      <h3>{entry.title}</h3>
                    </div>
                    <button className="delete-entry" type="button" onClick={() => handleDelete(entry.id)} aria-label={`Delete ${entry.title}`}>Delete</button>
                  </div>
                  <p>{entry.thoughts}</p>
                  <small>{new Date(entry.createdAt).toLocaleString()}</small>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Journal
