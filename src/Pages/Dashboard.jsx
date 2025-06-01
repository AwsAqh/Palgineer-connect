import React from 'react';
import Header from '../Componetns/header';
import Footer from '../Componetns/footer';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/dashboard.css';
const Dashboard = () => {
  return (
    <div className='dashboard-page-container'>
        <Header/>
        <div className='dashboard-page-content'>
            <div className='dash-side-nav-bar'>
                    this is side nav bar
            </div>

        
            <div className='dash-user-info'>
                <div className='basic-info'>

                    <div className='dash-user-info-avatar'>
                    <div >
                    <PersonIcon/>
                    </div>
                    </div>

                    <div className='basic-info-form-area' >
                        <div className='basic-info-form-area-row'>
                           
                                <input type='text' class="form-control" placeholder='Full Name' value="John Doe" />
                                <input type='text' class="form-control" placeholder='Email' value="john.doe@example.com" />
                            
                        </div>

                        <div className='basic-info-form-area-row'>
                            
                                <input type='text' class="form-control" placeholder='Full Name' value="John Doe" />
                                <input type='text' class="form-control" placeholder='Email' value="john.doe@example.com" />
                            
                        </div>
                        
                    </div>
               </div>
               <div  className='technical-info'>
                    <div className='summary-input-area'>
                        <input type='text' placeholder='Summary' value="John Doe" />
                    </div>
                    <div className="tech-stack-area">
                        <div className="skill"> react.js </div>
                        <div className="skill"> react.js </div>
                        <div className="skill"> react.js </div>
                        <div className="skill"> react.js </div>
                        <div className="skill"> react.js </div>
                        <div className="skill"> react.js </div>
                        
                    </div>
                    <div className="resume-area">
                        <input type='file' placeholder='Upload Resume' />
                        <label htmlFor='resume-upload'>Upload Resume</label>
                    </div>
               </div>
            </div>
           
        </div>
    </div>
  );
};

export default Dashboard;
