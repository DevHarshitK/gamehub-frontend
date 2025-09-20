import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import { GameProvider } from './context/GameContext'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin (in real app, this would be from authentication)
    const adminStatus = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(adminStatus)
  }, [])

  const toggleAdmin = () => {
    const newAdminStatus = !isAdmin
    setIsAdmin(newAdminStatus)
    localStorage.setItem('isAdmin', newAdminStatus.toString())
  }

  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/admin" 
                element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />} 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameProvider>
  )
}

export default App
