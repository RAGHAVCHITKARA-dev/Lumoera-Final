
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { currentUser, logOut } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logOut()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ✿ Lumeora
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/mood" className={({ isActive }) => isActive ? 'active' : ''}>
            Mood
          </NavLink>
        </li>

        <li>
          <NavLink to="/breathing" className={({ isActive }) => isActive ? 'active' : ''}>
            Breathing
          </NavLink>
        </li>

        {currentUser ? (
          <>
            <li>
              <NavLink to="/journal" className={({ isActive }) => isActive ? 'active' : ''}>
                Journal
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                Profile
              </NavLink>
            </li>

            <li>
              <button type="button" className="nav-cta" onClick={handleLogout}>
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Log in
              </NavLink>
            </li>

            <li>
              <Link to="/signup" className="nav-cta">
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
