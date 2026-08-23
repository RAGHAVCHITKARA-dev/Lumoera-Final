import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Mood from './pages/Mood.jsx'
import Breathing from './pages/Breathing.jsx'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/breathing" element={<Breathing />} />
      </Routes>
    </>
  )
}

export default App