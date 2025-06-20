import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Componetns/header'
import banner from '../assets/team-work.jpg'
import about from '../assets/team-work-about.jpg'
import '../styles/homePage.css'
import FieldCard from '../Componetns/field-card'
import Footer from '../Componetns/footer'
const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className='register-page-container'> 
        <Header />
    <div className='home-content'>
         <div className='home-banner'>
            <img src={banner} alt='banner' />
            <div className='banner-content'>
                <h1>Welcome to Palgineer</h1>
                <p>The best place to learn and grow</p> 
                <button className='btn btn-primary' onClick={() => navigate('/find')}>Get Started</button>
            </div>
         </div>
         <div className='search-fields'>
            <select className='form-select'>
                <option value=''>Select a category</option>
            </select>
            <select className='form-select'>
                <option value=''>Select a category</option>
            </select>
            <select className='form-select'>
                <option value=''>Select a category</option>
            </select>
            <button className='btn btn-primary'>Search</button>
         </div>
         <div className='fields-area' > 
                        Hire A
         <div className='field-cards'>
        
            <FieldCard />
            <FieldCard />
            <FieldCard />
            <FieldCard />
         </div>
         </div>
         <div className='home-about'>
           <div className='about-content'>
             <div className='about-title'>About Palgineer</div>
             <div className='about-description'>
               Palgineer is a local platform in Palestine designed to help tech companies find their ideal software engineers. Unlike traditional job boards, here companies search for Software Engineers (SWE) who have created profiles, provided their skills, and set their current status (available to hire, hired, etc). This approach streamlines the hiring process for companies and empowers engineers to showcase their expertise and availability, making it easier for Palestinian tech companies to connect with the right talent quickly and efficiently.
             </div>
           </div>
           <img className='about-image' src={about} alt='About Palgineer'/>
         </div>
         <Footer />
    </div>
    </div>
  )
}

export default HomePage