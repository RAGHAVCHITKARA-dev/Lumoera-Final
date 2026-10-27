import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const USERS_KEY = 'lumeora-demo-users'
const SESSION_KEY = 'lumeora-demo-session'

// Classroom demo only: localStorage is not secure authentication.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY)
      setCurrentUser(session ? JSON.parse(session) : null)
    } catch {
      setCurrentUser(null)
    } finally {
      setAuthLoading(false)
    }
  }, [])

  function signUp({ name, email, password }) {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
      const normalizedEmail = email.trim().toLowerCase()

      if (users.some((user) => user.email === normalizedEmail)) {
        return { success: false, message: 'An account with this email already exists.' }
      }

      const user = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: name.trim(),
        email: normalizedEmail,
        password,
      }
      users.push(user)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      const session = { id: user.id, name: user.name, email: user.email }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setCurrentUser(session)
      return { success: true }
    } catch {
      return { success: false, message: 'Could not create the demo account. Check browser storage.' }
    }
  }

  function logIn({ email, password }) {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
      const user = users.find((item) => item.email === email.trim().toLowerCase() && item.password === password)

      if (!user) return { success: false, message: 'Email or password is incorrect.' }

      const session = { id: user.id, name: user.name, email: user.email }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setCurrentUser(session)
      return { success: true }
    } catch {
      return { success: false, message: 'Could not log in. Check browser storage.' }
    }
  }

  function logOut() {
    localStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, authLoading, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
