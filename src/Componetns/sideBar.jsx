import React, { useState } from 'react'
import "../Styles/navbar.css"
import PersonIcon from '@mui/icons-material/Person';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import { useLocation, useNavigate } from 'react-router-dom';
const sideBar = ({sidebarOpen, setSidebarOpen}) => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const navigate=useNavigate()
    const endPoint=useLocation().pathname.split('/').pop()
  return (
    <>
    <div className={`dash-side-nav-bar${sidebarOpen ? ' open' : ''}`}>
              
    <button 
      className='sidebar-close-btn' 
      onClick={() => setSidebarOpen(false)}
      aria-label='Close sidebar'
    >
      &times;
    </button>
    <div className='side-nav-bar-options-fixed'>
        <div className='dash-side-nav-bar-list'>
            <ul >

                <li className={endPoint==='home' ? 'active' : ''} onClick={()=>{navigate('/')}}> Home </li>

                {user&&<li className={endPoint==='dashboard' ? 'active' : ''}>
                    <DashboardTwoToneIcon/>
                    <span onClick={()=>{navigate('/dashboard')}}>Dashboard</span>
                </li>}
                <li className={endPoint==='find' ? 'active' : ''}>
                    <TravelExploreTwoToneIcon/>
                    <span onClick={()=>{navigate('/find')}}>Find Engineer</span>
                </li>
            </ul>
        </div>
        {user&&<div id='logout_div'>
            <span onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('user');console.log("logged out,user removed"); navigate('/login')}}>Logout</span>
        </div>}
    </div>
</div>

{sidebarOpen && (
  <div 
    className='sidebar-overlay' 
    onClick={() => setSidebarOpen(false)}
  />
)}
    </>
  )
}

export default sideBar
