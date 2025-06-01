import React, { useState, useRef } from 'react';
import Header from '../Componetns/header';
import Footer from '../Componetns/footer';
import '../styles/homePage.css';
import "../styles/register.css"

import PersonIcon from '@mui/icons-material/Person';

const Register = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: '',
    experience: '',
    status: '',
    avatar: null,
  });
  const [skills, setSkills] = useState([]);
  
  const avatarInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // Submit formData to backend here
    alert('Registration submitted!');
  };

  const handleSkillKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && e.target.value) {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !skills.includes(value)) {
        setSkills([...skills, value]);
      }
      e.target.value = '';
    }
  };

  const handleRemoveSkill = (removeSkill) => {
    setSkills(skills.filter(skill => skill !== removeSkill));
  };

  return (
    <div className='full-page-container'>
      <Header />

      <div className="register-flex-row">
        <div className="register-content">
          {step === 1 && (
            <form className='register-form' onSubmit={handleContinue}>
              <div className='register-progress-bar-container'>
                <div className='register-progress-label'>
                  Step 1 of 4
                </div>
                <div className='register-progress-bar-bg'>
                  <div
                    className='register-progress-bar-fill'
                    style={{ width: '25%' }}
                  ></div>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='name'>Full Name</label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Enter your full name' required />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' required />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Create a password' required />
              </div>
              <button className='btn btn-primary register-btn' type='submit'>Continue</button>
            </form>
          )}
          {step === 2 && (
            <form className='register-form' onSubmit={handleContinue}>
              <div className='register-progress-bar-container'>
                <div className='register-progress-label'>
                  Step 2 of 4
                </div>
                <div className='register-progress-bar-bg'>
                  <div
                    className='register-progress-bar-fill'
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='skills'>Skills</label>
                <div className="skills-tags-input">
                  <div className="skills-tags-scroll">
                    {skills.map((skill, idx) => (
                      <span className="skill-tag" key={idx}>
                        {skill}
                        <button type="button" className="remove-skill" onClick={() => handleRemoveSkill(skill)}>×</button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    id="skills"
                    placeholder="Add a skill and press Enter"
                    onKeyDown={handleSkillKeyDown}
                    className="skills-input"
                  />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='experience'>Experience</label>
                <input type='text' id='experience' name='experience' value={formData.experience} onChange={handleChange} placeholder='e.g. 3 years, Intern, etc.' required />
              </div>
              <div className='form-group'>
                <label htmlFor='status'>Status</label>
                <select id='status' name='status' value={formData.status} onChange={handleChange} required>
                  <option value=''>Select status</option>
                  <option value='available'>Available to Hire</option>
                  <option value='hired'>Hired</option>
                  <option value='not-looking'>Not Looking</option>
                </select>
              </div>
              <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
                <button className='btn btn-secondary register-btn' style={{ flex: 1 }} onClick={handleBack}>Back</button>
                <button className='btn btn-primary register-btn' style={{ flex: 1 }} type='submit'>Register</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className='register-form' onSubmit={handleContinue}>
              <div className='register-progress-bar-container'>
                <div className='register-progress-label'>Step 3 of 4</div>
                <div className='register-progress-bar-bg'>
                  <div className='register-progress-bar-fill' style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className='register-step3-row'>
                <div className='register-step3-title'>
                  Write a short description about yourself
                </div>
                <div className='register-step3-fields'>
                  <textarea
                    className='register-textarea'
                    name='about'
                    value={formData.about || ''}
                    onChange={handleChange}
                    placeholder='e.g. I am a software engineer with 3 years of experience in React, Node.js, and Python. I am passionate about building scalable web applications...'
                    rows={6}
                    required
                  />
                  <button className='btn btn-primary register-btn' type='button'>
                    Upload CV
                  </button>
                  <div style={{ display: 'flex', width: '100%', gap: '1rem', marginTop: '1rem' }}>
                    <button className='btn btn-secondary register-btn' style={{ flex: 1 }} onClick={handleBack}>Back</button>
                    <button className='btn btn-primary register-btn' style={{ flex: 1 }} type='submit'>Register</button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 4 && (
            <form className='register-form' onSubmit={handleSubmit}>
              <div className='register-progress-bar-container'>
                <div className='register-progress-label'>Step 4 of 4</div>
                <div className='register-progress-bar-bg'>
                  <div className='register-progress-bar-fill' style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className='register-step4-row'>
                <div className='register-step4-avatar'>
                  <span className='register-step4-avatar-icon'>
                    <PersonIcon style={{ fontSize: 40 }} />
                  </span>
                </div>
                <label className='register-step4-label'>Upload your profile picture</label>
                <input
                ref={avatarInputRef}
                  type="file"
                  id="file"
                  name="file"
                  className="register-step4-file"
                  accept=".jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={(e)=>{console.log("file",avatarInputRef.current.files[0]) 
                        setFormData({...formData,avatar:avatarInputRef.current.files[0]})
                   }}
                />
                <label htmlFor="file" className="register-step4-upload-btn">
                 {formData.avatar ? formData.avatar.name : "Choose File"}
                </label>
                <div className="register-step4-btns">
                  <button className='btn btn-secondary register-btn' type="button" onClick={handleBack}>Back</button>
                  <button
                    className='btn btn-primary register-btn'
                    type="submit"
                  
                  >
                    {  formData.avatar
                      ? "Submit"    
                      : "Skip & Register"}
                  </button>
                </div>
                <div className="register-step4-note">
                  Allowed: JPG, PNG. Max size: 5MB.
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="register-header-col">
          <div className="register-title">Create Your SWE Profile</div>
          <div className="register-description">
            Join Palgineer and let tech companies in Palestine find you! Fill in your details to showcase your skills and availability as a Software Engineer.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register; 