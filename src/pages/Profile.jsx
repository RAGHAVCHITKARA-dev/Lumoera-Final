
import { Link } from 'react-router-dom'
import Decor from '../components/Decor.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Profile() {
  const { currentUser } = useAuth()

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
          Welcome to your personal Lumeora space.
        </p>

        <div className="about-card profile-card">
          <div className="profile-avatar" aria-hidden="true">
            {currentUser.name.trim().charAt(0).toUpperCase()}
          </div>

          <h3>{currentUser.name}</h3>
          <p>{currentUser.email}</p>
          <span className="profile-demo-label">Local demo account</span>
        </div>

        <div className="profile-actions">
          <Link className="btn btn-primary" to="/mood">
            Check in with my mood
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Profile
