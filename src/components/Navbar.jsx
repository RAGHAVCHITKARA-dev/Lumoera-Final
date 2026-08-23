import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/mood', label: 'Mood' },
    { path: '/breathing', label: 'Breathing' },
  ]

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ✿ Lumeora
      </Link>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}

        <li>
          <Link to="/" className="nav-cta">
            Start Your Journey
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar