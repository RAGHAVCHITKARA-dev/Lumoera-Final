import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Decor from '../components/Decor.jsx'
import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Auth({ mode }) {
  const isSignup = mode === 'signup'
  const { currentUser, authLoading, signUp, logIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (authLoading) return <p className="auth-loading">Loading your account…</p>
  if (currentUser) return <Navigate to="/profile" replace />

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (isSignup && name.trim().length < 2) {
      setError('Please enter a name with at least 2 characters.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    const result = isSignup
      ? signUp({ name, email, password })
      : logIn({ email, password })

    if (!result.success) {
      setError(result.message)
      return
    }
    navigate(location.state?.from || '/profile', { replace: true })
  }

  return (
    <div className="page">
      <Decor />
      <section className="section container auth-section">
        <form className="about-card auth-card" onSubmit={handleSubmit} noValidate>
          <p className="auth-kicker">✿ Lumeora personal space</p>
          <h2 className="section-title">{isSignup ? 'Create your account' : 'Welcome back'}</h2>
          <p className="section-sub">{isSignup ? 'A little space that belongs to you.' : 'Your reflections are waiting for you.'}</p>

          {isSignup && <FormInput id="auth-name" label="Your name" value={name} onChange={setName} placeholder="How should we call you?" required />}
          <FormInput id="auth-email" label="Email address" value={email} onChange={setEmail} placeholder="you@example.com" required />
          <FormInput id="auth-password" label="Password" value={password} onChange={setPassword} placeholder="At least 6 characters" type="password" required />

          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="btn btn-primary auth-submit" type="submit">{isSignup ? 'Create demo account' : 'Log in'}</button>
          <p className="auth-switch">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Sign up'}</Link>
          </p>
          
        </form>
      </section>
    </div>
  )
}

export default Auth
