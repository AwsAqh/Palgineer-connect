import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Componetns/header'
import banner from '../assets/team-work.jpg'
import about from '../assets/team-work-about.jpg'
import '../styles/homePage.css'
import FieldCard from '../Componetns/field-card'
import Footer from '../Componetns/footer'
const HomePage = () => {

  const  fieldsDescription = {
    'Frontend Engineer': 'Frontend Engineer with a passion for building user-friendly interfaces',
    'Backend Engineer': 'Backend Engineer with a passion for building scalable and efficient APIs',
    'Full Stack Engineer': 'Full Stack Engineer with a passion for building scalable and efficient APIs and user-friendly interfaces',
    'DevOps Engineer': 'DevOps Engineer with many experience in automation and deployment',
    'QA Engineer': 'QA Engineer for testing the software and ensuring the quality of the software',
    'AI Architect': 'AI Architect with a passion for building scalable and efficient AI applications',
    'Mobile Engineer': 'Mobile Engineer with a passion for building mobile applications',
    'Data Engineer': 'Data Engineer for building scalable and efficient data pipelines',
  }
  const navigate = useNavigate()

  const [filters,setFilters] = useState({
    experience:'',
    status:'',
    role:''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/find',{state:{filters:{
      experience:e.target.experience.value,
      status:e.target.status.value,
      role:e.target.role.value
    }}})
  }
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
            <form onSubmit={handleSearch}> 
            <select name='experience' className='form-select'>
            <option value=''>All Experience</option>
                                    <option value='Junior'>Junior</option>
                                    <option value='Mid-level'>Mid-level</option>
                                    <option value='Senior'>Senior</option>
            </select>
            <select name='status' className='form-select'>
            <option value=''>All Status</option>
                                    <option value='Available'>Available</option>
                                    <option value='Hired'>Hired</option>
                                    <option value='Intern'>Intern</option>
                                    <option value='Contractor'>Contractor</option>
                                    <option value='On Leave'>On Leave</option>
            </select>
            <select name='role' className='form-select'>
            <option value=''>All Roles</option>
                                    <option value='Frontend Engineer'>Frontend Engineer</option>
                                    <option value='Backend Engineer'>Backend Engineer</option>
                                    <option value='Full Stack Engineer'>Full Stack Engineer</option>
                                    <option value='DevOps Engineer'>DevOps Engineer</option>
                                    <option value='Mobile Engineer'>Mobile Engineer</option>
                                    <option value='Data Engineer'>Data Engineer</option>
                                    <option value="QA Engineer">QA Engineer</option>
                                    <option value="AI Architect">AI Architect</option>
            </select>
            <button type='submit' className='btn btn-primary'>Search</button>
            </form>
         </div>
         <div className='fields-area' > 
                        Hire A
         <div className='field-cards'>
        
          {Object.keys(fieldsDescription).map((field,index)=>(
            <FieldCard e={field} key={index} field={field} description={fieldsDescription[field]} />
          ))}
          
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