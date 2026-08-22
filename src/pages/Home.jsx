import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard.jsx'
import Decor from '../components/Decor.jsx'

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😐', label: 'Okay', value: 'okay' },
  { emoji: '😔', label: 'Low', value: 'low' },
  { emoji: '😣', label: 'Anxious', value: 'anxious' },
]

const features = [
  { emoji: '🌬', title: 'Breathing', desc: 'Slow, guided breaths to calm your nervous system.', link: '/breathing' },
  { emoji: '📖', title: 'Journal', desc: 'A cozy scrapbook space for your private thoughts.', link: '/journal' },
  { emoji: '🌸', title: 'Affirmations', desc: 'Gentle words to remind you that you are okay.', link: '/mood' },
  { emoji: '😊', title: 'Mood', desc: 'Check in with yourself, one feeling at a time.', link: '/mood' },
]

const quotes = [
  '“You don’t have to control your thoughts. You just have to stop letting them control you.”',
  '“This feeling is a visitor, not a resident.”',
  '“Soft days are still good days.”',
  '“Breathe in courage, breathe out fear.”',
  '“Small steps still move you forward.”',
  '“You have survived 100% of your hard days so far.”',
]

const meditationLink = 'https://www.youtube.com/results?search_query=10+minute+calming+meditation'
const yogaLink = 'https://www.youtube.com/results?search_query=beginner+calming+yoga+for+anxiety'

function Home() {
  const [journeyStarted, setJourneyStarted] = useState(false)
  const [mood, setMood] = useState('')
  const [quoteIndex, setQuoteIndex] = useState(0)

  // runs once when Home first loads — picks a random quote to greet the user
  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length))
  }, [])

  function newQuote() {
    let next = Math.floor(Math.random() * quotes.length)
    if (next === quoteIndex) next = (next + 1) % quotes.length
    setQuoteIndex(next)
  }

  function startJourney() {
    setJourneyStarted(true)
    setMood('')
  }

  const isPositive = mood === 'happy' || mood === 'calm'
  const isOkay = mood === 'okay'
  const isLow = mood === 'low' || mood === 'anxious'

  return (
    <div className="page">
      <Decor />

      {/* HERO */}
      <section className="hero">
        <span className="hero-eyebrow">welcome to your soft place ✿</span>
        <h1>A little light for your mind.</h1>
        <p className="hero-sub">Breathe. Feel. Reflect. Begin again.</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={startJourney}>🌙 Start Your Journey</button>
          <Link to="/about" className="btn btn-outline">Learn about Lumeora</Link>
        </div>

        {/* WELLNESS FLOW */}
        {journeyStarted && (
          <div className="journey-box">
            {!mood && (
              <>
                <h3>How are you feeling right now?</h3>
                <div className="mood-row">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      className={`mood-btn ${mood === m.value ? 'selected' : ''}`}
                      onClick={() => setMood(m.value)}
                    >
                      {m.emoji}
                      <span className="mood-label">{m.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {isPositive && (
              <div>
                <h3>That’s lovely to hear 🌷</h3>
                <p>Hold onto this feeling — you deserve every bit of it.</p>
                <p className="quote-box" style={{ marginTop: 18 }}>
                  <span className="quote-text" style={{ fontSize: 18 }}>{quotes[quoteIndex]}</span>
                </p>
                <Link to="/journal" className="btn btn-primary" style={{ marginTop: 20 }}>
                  📝 Leave a Positive Note in Journal
                </Link>
              </div>
            )}

            {isOkay && (
              <div>
                <h3>An “okay” day is still a good day 🌾</h3>
                <p>Here’s something gentle to steady you.</p>
                <div className="response-cards">
                  <Link to="/breathing" className="response-card">
                    <div className="emoji">🌬</div>
                    <p>Breathing</p>
                  </Link>
                  <a href={meditationLink} target="_blank" rel="noreferrer" className="response-card">
                    <div className="emoji">🧘</div>
                    <p>Meditation</p>
                  </a>
                  <Link to="/journal" className="response-card">
                    <div className="emoji">📖</div>
                    <p>Journal</p>
                  </Link>
                </div>
              </div>
            )}

            {isLow && (
              <div>
                <h3>Thank you for being honest with yourself 🤍</h3>
                <p>Whatever you’re feeling is valid — let’s take this slowly, together.</p>
                <div className="response-cards">
                  <Link to="/breathing" className="response-card">
                    <div className="emoji">🌬</div>
                    <p>Breathing</p>
                  </Link>
                  <a href={meditationLink} target="_blank" rel="noreferrer" className="response-card">
                    <div className="emoji">🧘</div>
                    <p>Meditation</p>
                  </a>
                  <a href={yogaLink} target="_blank" rel="noreferrer" className="response-card">
                    <div className="emoji">🌸</div>
                    <p>Yoga</p>
                  </a>
                </div>
                <Link to="/journal" className="btn btn-primary" style={{ marginTop: 22 }}>
                  📖 Open My Journal
                </Link>
              </div>
            )}
          </div>
        )}
      </section>

      {/* FEATURE CARDS */}
      <section className="section container">
        <h2 className="section-title">Everything you need, softly</h2>
        <p className="section-sub">Four little corners of calm, always here for you.</p>
        <div className="grid">
          {features.map((f) => (
            <FeatureCard key={f.title} emoji={f.emoji} title={f.title} desc={f.desc} link={f.link} />
          ))}
        </div>
      </section>

      {/* DAILY QUOTE */}
      <section className="section container">
        <h2 className="section-title">Thought for today</h2>
        <div className="quote-box">
          <p className="quote-text">{quotes[quoteIndex]}</p>
          <button className="btn btn-soft" onClick={newQuote}>✨ New Quote</button>
        </div>
      </section>
    </div>
  )
}

export default Home
