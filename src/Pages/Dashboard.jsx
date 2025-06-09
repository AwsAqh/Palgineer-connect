import React, {useState, useRef, useEffect} from 'react';
import Header from '../Componetns/header';
import Footer from '../Componetns/footer';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import '../styles/dashboard.css';
import pdfImage from '../assets/pdf-image.png';

import {SocialIcon} from 'react-social-icons';

const Dashboard = () => {
    const [avatar,setAvatar] = useState(null);
    const [skills,setSkills] = useState(['reactJS','reactNasdsfsdfsdfsdfsdftive','nodeJS','express','mongodb','mysql','postgresql','firebase','aws','docker']);
    const [addSkillInputAppeared,setAddSkillInputAppeared] = useState(false);
    const[addLinkFormAppeared,setAddLinkFormAppeared] = useState(false);
    const [links,setLinks] = useState([
        {
           name:'LinkedIn',
           url:'https://www.linkedin.com/in/john-doe-1234567890'
        },
        {
            name:'LinkedIn',
            url:'https://www.linkedin.com/in/john-doe-1234567890'
        },
        {
            name:'LinkedIn',
            url:'https://www.linkedin.com/in/john-doe-1234567890'
        },
        
    ])
    const[editLinkFormAppeared,setEditLinkFormAppeared] = useState(Array(links.length).fill(false));

    const emailRef = useRef(null);
    const fullNameRef = useRef(null);
    const experienceRef = useRef(null);
    const statusRef = useRef(null);
    const summaryRef = useRef(null);
    const addSkillInputRef = useRef(null);
    const linkNameRef = useRef(null);
    const linkUrlRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const editLinksNamesRef = useRef(Array(links.length).fill([links.map(link=>link.name)]));
    const editLinksUrlsRef = useRef(Array(links.length).fill([links.map(link=>link.url)]));
    
    const [editLinksNamesState, setEditLinksNamesState] = useState(
        Array(links.length).fill('').map((_, index) => links[index].name)
      );
      const [editLinksUrlsState, setEditLinksUrlsState] = useState(
        Array(links.length).fill('').map((_, index) => links[index].url)
      );


      const [formData,setFormData] = useState({
        avatar:null,
        fullName:'',
        email:'',
        experience:'',
        status:'',
        summary:'',
        skills:skills,
        links:links,
        resume:null
      })

    useEffect(() => {
      const handleClick = (e) => {
        if(e.target.className==='tech-stack-container' || e.target.id==='add-skill-input')  setAddSkillInputAppeared(true) 
        else  setAddSkillInputAppeared(false)
         

         if (
                e.target.closest('.links-area') && !e.target.className.includes('edit-icon') && !e.target.className.includes('edit-link-form-input')
            ) {
                setAddLinkFormAppeared(true);
            } 
           
            else
            if(e.target.className.includes('edit-link-form-input'))
            {}
            else{
                setAddLinkFormAppeared(false);
             setEditLinkFormAppeared(Array(links.length).fill(false))
               
            }
      };
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);

    useEffect(()=>{

        setEditLinksNamesState(links.map(link => link.name));
    setEditLinksUrlsState(links.map(link => link.url));

    },[links])


    const handleAvatarChange=(e)=>{
        let file = e.target.files[0];
        console.log(file)
        if(file){
            const url=URL.createObjectURL(file)
            setAvatar(url)
        }
    }


    const handleRemoveSkill=(skill)=>{
        setSkills(skills.filter(s=>s!==skill))
    }

    const handleAddLink=()=>{
       
        setLinks([...links,  {name:linkNameRef.current.value, url:linkUrlRef.current.value}  ]  )
        setEditLinkFormAppeared([...editLinkFormAppeared, false])
        setEditLinksNamesState([...editLinksNamesState, ''])
        setEditLinksUrlsState([...editLinksUrlsState, ''])
        setAddLinkFormAppeared(false)
        linkNameRef.current.value=''
        linkUrlRef.current.value=''
    }

    
    const handleRemoveLink=(link)=>{
        setLinks(links.filter(l=>l!==link))
    }

    const handleOpenEditLinkForm=(index)=>{
        setEditLinkFormAppeared(editLinkFormAppeared.map((_,i)=>i===index))
    }


    const handleNameChange = (index, value) => {
        setEditLinksNamesState((prevState) => {
          const updatedState = [...prevState];
          updatedState[index] = value; // Update only the specific index for the name
          return updatedState;
        });
      };
      
      const handleUrlChange = (index, value) => {
        setEditLinksUrlsState((prevState) => {
          const updatedState = [...prevState];
          updatedState[index] = value; // Update only the specific index for the url
          return updatedState;
        });
      };



    const handleSubmitEditLink=(index)=>{


        setLinks(links.map((link,i)=>i===index?{name:editLinksNamesRef.current[index].value,
             url:editLinksUrlsRef.current[index].value}:link))

             setEditLinkFormAppeared(editLinkFormAppeared.map((_,i)=>false))
    }
  return (
    <div className='dashboard-page-container'>
        <Header 
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen}
        />
        <div className='dashboard-page-content'>
            {/* Sidebar and overlay */}
            <div className={`dash-side-nav-bar${sidebarOpen ? ' open' : ''}`}>
                {/* Close button for mobile */}
                <button 
                  className='sidebar-close-btn' 
                  onClick={() => setSidebarOpen(false)}
                  aria-label='Close sidebar'
                >
                  &times;
                </button>
                <div className='side-nav-bar-options-fixed'>
                    <div className='dash-side-nav-bar-list'>
                        <ul>
                            <li>
                                <PersonIcon/>
                                Profile
                            </li>
                            <li>
                                <PersonIcon/>
                                <span>Profile</span>
                            </li>
                        </ul>
                    </div>
                    <div id='logout_div'>
                        Logout
                    </div>
                </div>
            </div>
            {/* Overlay for closing sidebar on mobile */}
            {sidebarOpen && (
              <div 
                className='sidebar-overlay' 
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <div className='dash-user-info'>
                <div className='basic-info dashboard-card'>

                    <div className='dash-user-info-avatar'>
                        <div>
                         { avatar? <img src={avatar}  />: <PersonIcon />}
                        </div>
                        <button className="edit-icon">
                            <label htmlFor='edit-avatar'><EditTwoToneIcon /></label>
                            <input  onChange={handleAvatarChange} type='file' id='edit-avatar' style={{display: 'none'}} />
                        </button>
                    </div>

                    <div className='basic-info-form-area' >
                        <div className='basic-info-form-area-row'>
                                <div>
                                <label htmlFor='full-name'>Full Name</label>
                                <input ref={fullNameRef} type='text' name='full-name' class="form-control" placeholder='Full Name'/>
                                </div>
                                <div>
                                <label htmlFor='email'>Email</label>
                                <input ref={emailRef} type='text' name='email' class="form-control" placeholder='john.doe@example.com' />
                                 </div>
                        </div>

                        <div className='basic-info-form-area-row'>
                        <div  >
                            <label htmlFor='experience'>Experience</label>
                                <select ref={experienceRef} className='form-control' name='experience'>
                                    <option value='1'>Beginner</option>
                                    <option value='2'>Intermediate</option>
                                    <option value='3'>Advanced</option>
                                    <option value='4'>Expert</option>
                                    <option value='5'>Senior</option>
                                </select>
                                </div>
                                <div>
                            <label htmlFor='status'>Status</label>
                                <select ref={statusRef} className='form-control' name='status'>
                                    <option value='1'>Available</option>
                                    <option value='2'>Hired</option>
                                    <option value='3'>On Leave</option>
                                    <option value='4'>Intern</option>
                                    <option value='5'>Senior</option>
                                </select>
                                </div>
                        </div>
                        
                    </div>
               </div>
               <div  className='technical-info'>
                    <div className='summary-input-area dashboard-card'>
                        <label htmlFor='summary'>Summary</label>
                        
                        <textarea ref={summaryRef} type='text' name='summary' placeholder='Summary' value="This is summary, this is summary This is summary, this is summary This is summary, this is summary
                        This is summary, this is summary
                        This is summary, this is summary
                        This is summary, this is summary" />
                    </div>

                    <div className='tech-stack-area dashboard-card'>
                    Tech stack
                    <div className='tech-stack-container'>
                            
                            {skills.length >0?
                                skills.map((skill,index)=>{
                                return <div key={index}  onClick={()=>{handleRemoveSkill(skill)}} className='skill'>{skill}</div>
                                }):
                        <div style={{width:'100%', textAlign:'center'}}>No skills found</div>
                        }
                        <input
                          id="add-skill-input"
                          className={addSkillInputAppeared ? 'add-skill-input-appeared' : 'add-skill-input-hidden'}
                          placeholder="Add Skill"
                          onFocus={() => setAddSkillInputAppeared(true)}
                          onBlur={() => setAddSkillInputAppeared(false)}
                          onKeyDown={(e)=>{
                            if(e.key==='Enter'&& e.target.value){
                                setSkills([...skills,e.target.value])
                                e.target.value=''
                            }
                          }}
                        />    
                    </div>
                    </div>


                        <div className='links-area dashboard-card'>
                           Links
                           <div className='links-items-container'>
                      {links.length >0?      
                       links.map((link,index)=>{
                        return(
                        <div key={index} className='link-item'>
                             <div className='link-container'>
                                    <div className='link-item-logo' >
                                        <SocialIcon  style={{width:35,height:35}} url={link.url} />
                                        <span>{link.name}</span>
                                    </div>
                                    <span>{link.url}</span>
                                    <div>
                                        <EditTwoToneIcon className='edit-icon' onClick={()=>{
                                            console.log(editLinkFormAppeared)
                                            handleOpenEditLinkForm(index)}}/>
                                        <DeleteTwoToneIcon onClick={()=>handleRemoveLink(link)}/>
                                    </div>
                             </div>

                                <div id='edit-link-form' className={editLinkFormAppeared[index] ? 'add-link-form' : 'hidden'}>
                                    <input 
                                    className='edit-link-form-input'
                                    ref={el => editLinksNamesRef.current[index] = el}
                                    type='text' 
                                    placeholder={link.name} 
                                    value={editLinksNamesState[index]}
                                     onChange={(e)=>handleNameChange(index,e.target.value)}
                                    />
                                    
                                    <input 
                                    className='edit-link-form-input'
                                    ref={el => editLinksUrlsRef.current[index] = el}
                                    style={{width:'100%'}} type='text' 
                                    placeholder={link.url}
                                    onChange={(e)=>handleUrlChange(index,e.target.value)}
                                    value={editLinksUrlsState[index]}
                                    />
                                    <CheckTwoToneIcon onClick={()=>{handleSubmitEditLink(index)}}/>
                            </div>


                        </div>
                        )
                       }):
                       <div>No links found</div>
                       }
                       <div id='add-link-form' className={addLinkFormAppeared ? 'add-link-form' : 'hidden'}>
                        <input 
                        ref={linkNameRef}
                         type='text' placeholder='Link Name' />
                        <input 
                        ref={linkUrlRef}
                        style={{width:'100%'}} type='text' placeholder='Link URL' />
                        <AddTwoToneIcon onClick={handleAddLink}/>
                       </div>

                            </div>
                           </div>



                    <div className="resume-area dashboard-card">
                        <input id='resume-upload' name='resume-upload' type='file' accept='.pdf,.doc,.docx' 
                         onChange={(e)=>setFormData({...formData,resume:e.target.files[0]})}/>
                        <img src={pdfImage} alt='upload resume' />
                        <label htmlFor='resume-upload'>{formData.resume ? formData.resume.name : 'Upload Resume'}</label>
                        <div> Accepted files: pdf, doc, docx </div>
                    </div>
               </div>
            </div>
           
        </div>
    </div>
  );
};

export default Dashboard;
