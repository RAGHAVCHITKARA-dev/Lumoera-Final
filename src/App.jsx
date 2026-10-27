
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Mood from './pages/Mood.jsx'
import Breathing from './pages/Breathing.jsx'
import Auth from './pages/Auth.jsx'
import Profile from './pages/Profile.jsx'
import Journal from './pages/Journal.jsx'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/breathing" element={<Breathing />} />

        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="/journal"
          element={
            <RequireAuth>
              <Journal />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
