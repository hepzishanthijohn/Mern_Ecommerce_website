import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Admin from './pages/Admin/Admin'
import LoginSignup from './pages/Login/LoginSignup'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App