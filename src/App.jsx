import { useState } from 'react'
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import FindEng from './Pages/FindEng';
import { Analytics } from "@vercel/analytics/react"
function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard key="dashboard" />} />
        <Route path="/find" element={<FindEng />} />
        <Route path="/profile/:id" element={<Dashboard key="profile" />} />
      </Routes>
     <Analytics/>
    </Router>
   
  )
}

export default App
