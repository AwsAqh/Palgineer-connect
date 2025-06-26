import React from 'react'
import '../styles/footer.css'
import {SocialIcon} from 'react-social-icons';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/');
    setTimeout(() => {
      const aboutSection = document.querySelector('.home-about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleHireEngineerClick = () => {
    navigate('/');
    setTimeout(() => {
      const hireSection = document.querySelector('.field-cards');
      if (hireSection) {
        hireSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
            <h3>About Us</h3>
            <ul>
                <li onClick={handleAboutClick} style={{cursor:'pointer'}} >About Us</li>
                <li onClick={handleHireEngineerClick} style={{cursor:'pointer'}} >Hire Engineer</li>
                <li  onClick={()=>{window.open('https://github.com/awsaqh/palgineer-connect', '_blank')}} style={{cursor:'pointer'}} >Open source project</li>

            </ul>
            </div>
            <div className='footer-section'>
            <h3>Follow Us</h3>
            <ul style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                
                <li><SocialIcon url="https://linkedin.com/in/awsaqhash" /></li>
                <li><SocialIcon url="https://instagram.com/aws_aqh" /></li>
                </ul>
                <ul style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                <li><SocialIcon url="https://facebook.com/awsaqh" /></li>
                <li><SocialIcon url="https://github.com/awsaqh" /></li>
                </ul>
            </div>
            <div className='footer-section'>
            <h3>Contact Us</h3>
            <ul>
                <li onClick={()=>{window.open('mailto:awsaqh@gmail.com', '_blank')}} style={{cursor:'pointer'}} >awsaqh@gmail.com</li>
                <li onClick={()=>{window.open('tel:+972595152186', '_blank')}} style={{cursor:'pointer'}} >+972595152186</li>
                <li>Palestine, Jenin</li>
            </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Footer
