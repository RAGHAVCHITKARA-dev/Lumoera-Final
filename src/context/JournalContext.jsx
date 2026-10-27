import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const JournalContext = createContext(null)

export function JournalProvider({ children }) {
  const { currentUser } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const storageKey = currentUser ? `lumeora-journal-${currentUser.id}` : null

  useEffect(() => {
    setLoading(true)
    setError('')
    try {
      const savedEntries = storageKey ? localStorage.getItem(storageKey) : null
      setEntries(savedEntries ? JSON.parse(savedEntries) : [])
    } catch {
      setEntries([])
      setError('Your journal could not be loaded. Please check your browser storage.')
    } finally {
      setLoading(false)
    }
  }, [storageKey])

  function saveEntries(updatedEntries) {
    if (!storageKey) return false
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedEntries))
      setEntries(updatedEntries)
      setError('')
      return true
    } catch {
      setError('Your entry could not be saved. Please check your browser storage.')
      return false
    }
  }

  function addEntry(entry) {
    return saveEntries([
      { ...entry, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, createdAt: new Date().toISOString() },
      ...entries,
    ])
  }

  function deleteEntry(id) {
    return saveEntries(entries.filter((entry) => entry.id !== id))
  }

  return (
    <JournalContext.Provider value={{ entries, loading, error, addEntry, deleteEntry, setError }}>
      {children}
    </JournalContext.Provider>
  )
}

export function useJournal() {
  const context = useContext(JournalContext)
  if (!context) throw new Error('useJournal must be used inside JournalProvider')
  return context
}
