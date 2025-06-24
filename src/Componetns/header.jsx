import React from 'react'
import '../styles/header.css'
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSidebarToggle, sidebarOpen }) => {
  const navigate = useNavigate();
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
        <div className='header-menu-item'>Home</div>
        <div className='header-menu-item' onClick={() => document.querySelector('.home-about')?.scrollIntoView({ behavior: 'smooth' })}>About</div>
        <div className='header-menu-item'>Contact</div>
      </div>
      <div className='user-auth'>
        <button className='login-button btn btn-primary' onClick={()=>{navigate('/login')}}>Login</button>
        <button className='signup-button btn btn-secondary' onClick={()=>{navigate('/register')}}>Signup</button>
      </div>
    </div>
  )
}

export default Header
