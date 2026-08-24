import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        ✿ Lumeora
      </Link>

      <ul className="nav-links">

        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/mood"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Mood
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/breathing"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Breathing
          </NavLink>
        </li>

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