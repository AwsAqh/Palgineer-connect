import React from 'react'
import '../styles/header.css'
const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-logo'>Palgineer</div>
      <div className='header-menu'>
        <div className='header-menu-item'>Home</div>
        <div className='header-menu-item' onClick={() => document.querySelector('.home-about').scrollIntoView({ behavior: 'smooth' })}>About</div>
        <div className='header-menu-item'>Contact</div>

      </div>
      <div className='user-auth'>
        <button className='login-button btn btn-primary'>Login</button>
        <button className='signup-button btn btn-secondary'>Signup</button>
      </div>
    </div>
  )
}

export default Header
