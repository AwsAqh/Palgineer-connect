import React from 'react'
import '../styles/footer.css'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
            <h3>About Us</h3>
            <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
            </ul>
            </div>
            <div className='footer-section'>
            <h3>Follow Us</h3>
            <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
            </ul>
            </div>
            <div className='footer-section'>
            <h3>Contact Us</h3>
            <ul>
                <li>Email</li>
                <li>Phone</li>
                <li>Address</li>
            </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Footer
