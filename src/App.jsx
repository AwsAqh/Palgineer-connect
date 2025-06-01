import { useState } from 'react'
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
   
  )
}

export default App
