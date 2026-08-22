import { Link } from 'react-router-dom'

// A simple, reusable card driven entirely by props
function FeatureCard({ emoji, title, desc, link }) {
  return (
    <Link to={link} className="feature-card" style={{ display: 'block' }}>
      <span className="feature-emoji">{emoji}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  )
}

export default FeatureCard
