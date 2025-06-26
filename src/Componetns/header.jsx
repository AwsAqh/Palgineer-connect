import React, { useState } from 'react'
import '../styles/header.css'
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSidebarToggle, sidebarOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/');
    // Wait for navigation to complete, then scroll
    setTimeout(() => {
      document.querySelector('.home-about')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleContactClick = () => {
    // Navigate to home and scroll to contact section
    navigate('/');
    setTimeout(() => {
      document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className='header-container'>
   
     
      <div className='header-logo'>
        <button
          className='sidebar-toggle'
          onClick={onSidebarToggle}
          aria-label='Toggle sidebar'
        >
          <ListTwoToneIcon />
        </button>
      <div className='header-logo-text' style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>Palgineer</div>
      </div>
      
      <div className='header-menu'>
        <div className='header-menu-item' onClick={()=>{navigate('/')}}>Home</div>
        <div className='header-menu-item' onClick={handleAboutClick}>About</div>
        <div className='header-menu-item' onClick={handleContactClick}>Contact</div>
        <div className='header-menu-item' onClick={()=>{navigate('/find')}}>Find Engineer</div>
      </div>
      <div className='user-auth'>
        { !isLoggedIn&& <button className='login-button ' onClick={()=>{navigate('/login')}}>Login</button>}
        { !isLoggedIn&& <button className='signup-button ' onClick={()=>{navigate('/register')}}>Signup</button>}
      </div>
    </div>
  )
}

export default Header
