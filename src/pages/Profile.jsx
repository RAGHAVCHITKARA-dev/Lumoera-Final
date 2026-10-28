
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Decor from '../components/Decor.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useJournal } from '../context/JournalContext.jsx'

function Profile() {
  const { currentUser } = useAuth()
  const { entries } = useJournal()
  const moodState = useSelector((state) => state.mood)

  const journalCount = entries.length
  const moodCount =
    moodState.userId === currentUser?.id ? moodState.history.length : 0

  if (!currentUser) {
    return null
  }

  return (
    <div className="page">
      <Decor />

      <section className="section container profile-section">
        <p className="auth-kicker">✿ Your personal space</p>
        <h2 className="section-title">A little about you</h2>
        <p className="section-sub">
          Your Lumeora reflections, gathered in one place.
        </p>

        <div className="about-card profile-card">
          <div className="profile-avatar" aria-hidden="true">
            {currentUser.name.trim().charAt(0).toUpperCase()}
          </div>

          <h3>{currentUser.name}</h3>
          <p>{currentUser.email}</p>
          <span className="profile-demo-label">Local demo account</span>
        </div>

        <div className="profile-stats">
          <div className="about-card profile-stat">
            <span aria-hidden="true">📖</span>
            <strong>{journalCount}</strong>
            <p>Journal entries</p>
          </div>

          <div className="about-card profile-stat">
            <span aria-hidden="true">🌷</span>
            <strong>{moodCount}</strong>
            <p>Mood check-ins</p>
          </div>
        </div>

        <div className="profile-actions">
          <Link className="btn btn-primary" to="/journal">
            Open my journal
          </Link>
          <Link className="btn btn-primary" to="/mood">
            Check in with my mood
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Profile
