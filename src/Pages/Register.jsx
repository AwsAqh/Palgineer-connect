import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componetns/header';
import Footer from '../Componetns/footer';
import '../styles/homePage.css';
import "../styles/register.css"
import Notification from '../Componetns/notification';
import PersonIcon from '@mui/icons-material/Person';

const Register = () => {
  const [notification,setNotification]=useState({
    message:"",
    actions:[],
    show:false,
    type:""
  })
  const navigate=useNavigate()
  const [step, setStep] = useState(1);
  const [avatarShown, setAvatarShown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: [],
    experience: '',
    summary: '',
    role: '',
    status: '',
    avatar: null,
    resume: null,
  });
  const [skills, setSkills] = useState([]);
  
  const avatarInputRef = useRef(null);

  useEffect(()=>{setFormData({...formData,skills:skills})},[skills])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if(step===1){

      if(formData.password.length<=5){
        setNotification({message:"Password should be 6 chars lenght", show:true, type:"red-background", actions:[] })
      setTimeout(()=>{setNotification({...notification,show:false})},3000)
      return;}

      else{
       
      try{
      setNotification({message:"Processing...", show:true, type:"blue-background", action:[]})
      console.log(formData.email, typeof(formData.email))
      const response=await fetch (`${import.meta.env.VITE_API_URL}/api/crud/check-email`,{method:"POST" ,headers:{"Content-Type":"application/json"}, body:JSON.stringify(formData.email)}) 

      if(!response.ok){
        console.log(await response.json())
      setNotification({message:"Email already exists!", show:true, type:"red-background", action:[]})
      setTimeout(()=>{setNotification({...notification,show:false})},3000)
      return;
      }
      setNotification({...notification,show:false})
      setStep(step+1)
    }
      

      catch(err){
        setNotification({message:"Something went wrong!", show:true, type:"red-background", action:[]})
        setTimeout(()=>{setNotification({...notification,show:false})},3000)
      }
    }}
     


    else
    
    setStep(step + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
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

const handleAvatarChange = (e) => {

    const url =URL.createObjectURL(e.target.files[0])
    setAvatarShown(url)
    setFormData({...formData,avatar:e.target.files[0]})

}


const handleSubmit = async(e) => {
    e.preventDefault();



    console.log(formData)
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('summary', formData.summary);
    formData.skills.forEach(skill=> formDataToSend.append('skills',skill))
    if(formData.experience>2 && formData.experience<4){formDataToSend.append('experience',"Mid-Level")}
    else
    if(formData.experience>=4){formDataToSend.append('experience',"Senior")}
    else{formDataToSend.append('experience',"Junior")}
    formDataToSend.append('status', formData.status);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('avatar', formData.avatar);
    formDataToSend.append('resume', formData.resume);
    
    try{
      setNotification({
        message:"Registering...",
        type:"blue-background",
        show:true
      })
    const response= await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`,{
        method:"POST",
        body:formDataToSend
    })
    setNotification({
      ...notification, shhow:false
    })
    
    const data=await response.json()
    if(response.ok){
       
        localStorage.setItem("token", JSON.stringify({token:data.token, expiresIn: "24h"}));
        localStorage.setItem("user",JSON.stringify(data.engineer))
        console.log(localStorage.getItem("user"))
        console.log("data in register",data)
        navigate("/dashboard")
    }

    else{
        const errorData=await response.json()
        setNotification({
          message:errorData.message,
          type:"red-background",
          show:true
        })
        console.log(errorData)
    }

    }
    
    catch(error){
        setNotification({
          message:"Something went wrong",
          type:"red-background",
          show:true
        })
        console.log(error)
    }

  };



  return (
    <div className='full-page-container'>
      <Header />
      <Notification title= {notification.message} actions= {notification.actions} showNotification={notification.show} type={notification.type}/>
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
              <button className='btn btn-primary register-btn' type='submit'  >Continue</button>
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
                <label htmlFor='role'>Role</label>
                <select id='role' name='role' value={formData.role} onChange={handleChange} required>
                  <option value=''>Select role</option>
                  <option value='Frontend Engineer'>Frontend Engineer</option>
                  <option value='Backend Engineer'>Backend Engineer</option>
                  <option value='Full Stack Engineer'>Full Stack Engineer</option>
                  <option value='DevOps Engineer'>DevOps Engineer</option>
                  <option value='Mobile Engineer'>Mobile Engineer</option>
                  <option value='Data Engineer'>Data Engineer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="AI Architect">AI Architect</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='experience'>Experience (in years)</label>
                <input type='text' id='experience' name='experience'  onChange={handleChange} placeholder='e.g. 3.' required />
              </div>
              <div className='form-group'>
                <label htmlFor='status'>Status</label>
                <select id='status' name='status' onChange={handleChange} required>
                  <option value=''>Select status</option>
                                         <option value='Available'>Available</option>
                                        <option value='Hired'>Hired</option>
                                        <option value='On Leave'>On Leave</option>
                                        <option value='Intern'>Intern</option>
                                        <option value='Contractor'>Contractor</option>
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
                    name='summary'
                    value={formData.summary || ''}
                    onChange={handleChange}
                    placeholder='e.g. I am a software engineer with 3 years of experience in React, Node.js, and Python. I am passionate about building scalable web applications...'
                    rows={6}
                    required
                  />
                  <input 
                    id="resume-upload"
                    onChange={(e)=>{setFormData({...formData,resume:e.target.files[0]})}} 
                    type='file' 
                    name='resume' 
                    accept='.pdf,.doc,.docx' 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor='resume-upload' className='register-step3-upload-btn' >
                    {formData.resume ? formData.resume.name : "Upload CV"}
                  </label>

                  <div style={{ display: 'flex', width: '100%', gap: '1rem', marginTop: '1rem' }}>
                    <button className='btn btn-secondary register-btn' style={{ flex: 1 }} onClick={handleBack}>Back</button>
                    <button className='btn btn-primary register-btn' style={{ flex: 1 }} type='submit'>Continue</button>
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
                   {avatarShown ? <img src={avatarShown} alt="Avatar" /> : <PersonIcon style={{ fontSize: 40 }} />}
                  </span>
                </div>
                <label className='register-step4-label'>Upload your profile picture</label>
                <input
                  ref={avatarInputRef}
                  type="file"
                  id="avatar-upload"
                  name="avatar"
                  className="register-step4-file"
                  accept=".jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload" className="register-step4-upload-btn">
                  {formData.avatar ? formData.avatar.name : "Choose File"}
                </label>
                <div className="register-step4-btns">
                  <button className='btn btn-secondary register-btn' type="button" onClick={handleBack}>Back</button>
                  <button
                    className='btn btn-primary register-btn'
                    type="submit"
                   onClick={handleSubmit}
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