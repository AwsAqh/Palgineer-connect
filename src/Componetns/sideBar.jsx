import React from 'react'
import "../Styles/dashboard.css"
import PersonIcon from '@mui/icons-material/Person';
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
                    <PersonIcon/>
                    Profile
                </li>
                <li>
                    <PersonIcon/>
                    <span>Profile</span>
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
