import React from 'react'
import "../Styles/navbar.css"
import PersonIcon from '@mui/icons-material/Person';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
const sideBar = ({sidebarOpen, setSidebarOpen}) => {
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
            <ul>
                <li>
                    <DashboardTwoToneIcon/>
                    <span>Dashboard</span>
                </li>
                <li>
                    <TravelExploreTwoToneIcon/>
                    <span>Find Engineer</span>
                </li>
            </ul>
        </div>
        <div id='logout_div'>
            Logout
        </div>
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
