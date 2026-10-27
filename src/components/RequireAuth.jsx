import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function RequireAuth({ children }) {
  const { currentUser, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) return <p className="auth-loading">Loading your account…</p>
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

export default RequireAuth
