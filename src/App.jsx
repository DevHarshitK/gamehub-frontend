import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Games from './pages/Games'
import AddGame from './pages/AddGame'
import Members from './pages/Members'
import AddMembers from './pages/AddMembers'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Games />} />
        <Route path='/addgame' element={<AddGame />} />
        <Route path='/members' element={<Members />} />
        <Route path='/addmember' element={<AddMembers />} />
      </Routes>

    </div>
  )
}

export default App