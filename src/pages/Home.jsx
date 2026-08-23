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
  {
    emoji: '🌬',
    title: 'Breathing',
    desc: 'Slow, guided breaths to calm your nervous system.',
    link: '/breathing',
  },
  {
    emoji: '🌸',
    title: 'Affirmations',
    desc: 'Gentle words to remind you that you are okay.',
    link: '/mood',
  },
  {
    emoji: '😊',
    title: 'Mood',
    desc: 'Check in with yourself, one feeling at a time.',
    link: '/mood',
  },
]

const quotes = [
  '“You don’t have to control your thoughts. You just have to stop letting them control you.”',
  '“This feeling is a visitor, not a resident.”',
  '“Soft days are still good days.”',
  '“Breathe in courage, breathe out fear.”',
  '“Small steps still move you forward.”',
  '“You have survived 100% of your hard days so far.”',
]

const meditationLink =
  'https://www.youtube.com/results?search_query=10+minute+calming+meditation'

const yogaLink =
  'https://www.youtube.com/results?search_query=beginner+calming+yoga+for+anxiety'

function ResponseCard({ emoji, title, link, external = false }) {
  const content = (
    <>
      <div className="emoji">{emoji}</div>
      <p>{title}</p>
    </>
  )

  if (external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="response-card"
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={link} className="response-card">
      {content}
    </Link>
  )
}

function Home() {
  const [journeyStarted, setJourneyStarted] = useState(false)
  const [mood, setMood] = useState('')
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length))
  }, [])

  function startJourney() {
    setJourneyStarted(true)
    setMood('')
  }

  function newQuote() {
    let next = Math.floor(Math.random() * quotes.length)

    if (next === quoteIndex) {
      next = (next + 1) % quotes.length
    }

    setQuoteIndex(next)
  }

  return (
    <div className="page">
      <Decor />

      <section className="hero">
        <span className="hero-eyebrow">
          welcome to your soft place ✿
        </span>

        <h1>A little light for your mind.</h1>

        <p className="hero-sub">
          Breathe. Feel. Reflect. Begin again.
        </p>

        <p className="hero-description">
          A gentle space to pause, breathe, and reconnect with yourself.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={startJourney}
          >
            🌙 Start Your Journey
          </button>

          <Link to="/about" className="btn btn-outline">
            Learn about Lumeora
          </Link>
        </div>

        {journeyStarted && (
          <div className="journey-box">
            {!mood && (
              <>
                <h3>How are you feeling right now?</h3>

                <div className="mood-row">
                  {moods.map((item) => (
                    <button
                      key={item.value}
                      className={`mood-btn ${
                        mood === item.value ? 'selected' : ''
                      }`}
                      onClick={() => setMood(item.value)}
                    >
                      {item.emoji}

                      <span className="mood-label">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {(mood === 'happy' || mood === 'calm') && (
              <div>
                <h3>That’s lovely to hear 🌷</h3>

                <p>
                  Hold onto this feeling — you deserve every bit of it.
                </p>

                <p
                  className="quote-box"
                  style={{ marginTop: 18 }}
                >
                  <span
                    className="quote-text"
                    style={{ fontSize: 18 }}
                  >
                    {quotes[quoteIndex]}
                  </span>
                </p>

                <Link
                  to="/mood"
                  className="btn btn-primary"
                  style={{ marginTop: 20 }}
                >
                  🌸 Explore Affirmations
                </Link>
              </div>
            )}

            {mood === 'okay' && (
              <div>
                <h3>An “okay” day is still a good day 🌾</h3>

                <p>
                  Here’s something gentle to steady you.
                </p>

                <div className="response-cards">
                  <ResponseCard
                    emoji="🌬"
                    title="Breathing"
                    link="/breathing"
                  />

                  <ResponseCard
                    emoji="🧘"
                    title="Meditation"
                    link={meditationLink}
                    external
                  />
                </div>
              </div>
            )}

            {(mood === 'low' || mood === 'anxious') && (
              <div>
                <h3>
                  Thank you for being honest with yourself 🤍
                </h3>

                <p>
                  Whatever you’re feeling is valid — let’s take
                  this slowly, together.
                </p>

                <div className="response-cards">
                  <ResponseCard
                    emoji="🌬"
                    title="Breathing"
                    link="/breathing"
                  />

                  <ResponseCard
                    emoji="🧘"
                    title="Meditation"
                    link={meditationLink}
                    external
                  />

                  <ResponseCard
                    emoji="🌸"
                    title="Yoga"
                    link={yogaLink}
                    external
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="section container">
        <h2 className="section-title">
          Everything you need, softly
        </h2>

        <p className="section-sub">
          Three little corners of calm, always here for you.
        </p>

        <div className="grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              emoji={feature.emoji}
              title={feature.title}
              desc={feature.desc}
              link={feature.link}
            />
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">
          Thought for today
        </h2>

        <div className="quote-box">
          <p className="quote-text">
            {quotes[quoteIndex]}
          </p>

          <button
            className="btn btn-soft"
            onClick={newQuote}
          >
            ✨ New Quote
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home