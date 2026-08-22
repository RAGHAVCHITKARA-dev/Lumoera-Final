import Decor from '../components/Decor.jsx'

const upcoming = [
  '📊 Mood Analytics',
  '🗂 Journal History',
  '🆘 SOS Button',
  '📞 Emergency Contacts',
  '🔔 Gentle Reminders',
]

function About() {
  return (
    <div className="page">
      <Decor />
      <section className="section container" style={{ paddingTop: 60 }}>
        <h2 className="section-title">About Lumeora</h2>
        <p className="section-sub">a little light, always within reach</p>

        <div className="about-card">
          <h3>What is Lumeora?</h3>
          <p>
            Lumeora is a cozy mental wellness companion built for the quiet moments —
            when stress creeps in, anxiety gets loud, a panic wave hits, or your thoughts
            just won’t stop spinning. It’s not a replacement for therapy or professional
            help, but a soft, private space to pause, breathe and check in with yourself.
          </p>
        </div>

        <div className="about-card">
          <h3>What can you do here?</h3>
          <p>
            Track how you feel on the <b>Mood</b> page, follow a calming rhythm on the
            <b> Breathing</b> page, and pour your thoughts into a dreamy scrapbook-style
            <b> Journal</b>. The Home page ties it all together with a short guided flow
            that responds to how you’re feeling in the moment.
          </p>
        </div>

        <div className="about-card">
          <h3>Coming soon 🌱</h3>
          <p>These features are being designed for a future version of Lumeora:</p>
          <div>
            {upcoming.map((item) => (
              <span key={item} className="future-tag">{item}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
