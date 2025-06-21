import React, {useState, useRef, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Componetns/header';
import Footer from '../Componetns/footer';
import Sidebar from '../Componetns/sideBar';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import '../styles/dashboard.css';
import pdfImage from '../assets/pdf-image.png';
import Notification from '../Componetns/notification';
import {SocialIcon} from 'react-social-icons';

const Dashboard = () => {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [token,setToken] = useState(JSON.parse(localStorage.getItem("token")))
    const lastPath = useLocation().pathname.split('/').pop();
    const [avatar,setAvatar] = useState(user.avatar);
    const [avatarFormData,setAvatarFormData] = useState(user.avatar)
    const [skills,setSkills] = useState(user.skills);
    const [addSkillInputAppeared,setAddSkillInputAppeared] = useState(false);
    const[addLinkFormAppeared,setAddLinkFormAppeared] = useState(false);
  
    const [links,setLinks] = useState(user.links || {})
    const [linksMap,setLinksMap] = useState(null)
    const[editLinkFormAppeared,setEditLinkFormAppeared] = useState([]);
    const [fullNameState,setFullNameState] = useState(user.name);
    const [emailState,setEmailState] = useState(user.email);
    const [experienceState,setExperienceState] = useState(user.experience);
    const [statusState,setStatusState] = useState(user.status);
    const [resumeState,setResumeState] = useState(user.resume);
    const [showNotification,setShowNotification] = useState(false);

    const [linksArray, setLinksArray] = useState([]) // Array for display

    const[notification,setNotification] = useState({
        message:'',
        type:'',
        show:showNotification,
        actions:[]
    });

    const summaryRef = useRef(null);
    const [summaryState,setSummaryState] = useState(user.summary || '');
    const linkNameRef = useRef(null);
    const linkUrlRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Fixed: Initialize these states properly
    const [editLinksNamesState, setEditLinksNamesState] = useState([]);
    const [editLinksUrlsState, setEditLinksUrlsState] = useState([]);

    const IsMounted=useRef(false)
    const [formData, setFormData] = useState({
        avatar: user.avatar,
        fullName: user.name,
        email: user.email,
        experience: user.experience,
        status: user.status,
        summary: user.summary,
        skills: user.skills,
        links: user.links || {}, // Keep as object
        resume: user.resume
    });

    // Fixed: Better useEffect for managing links arrays
    useEffect(() => {
        if (!links || Object.keys(links).length === 0) {
            setLinksArray([]);
            setEditLinkFormAppeared([]);
            setEditLinksNamesState([]);
            setEditLinksUrlsState([]);
            return;
        }

        // Convert object to array: { "LinkedIn": "https://...", "GitHub": "https://..." }
        // becomes [{ name: "LinkedIn", url: "https://..." }, { name: "GitHub", url: "https://..." }]
        const linkPairs = Object.entries(links).map(([name, url]) => ({ name, url }));
        
        setLinksArray(linkPairs);
        
        // Fixed: Ensure all arrays are properly synchronized
        const newEditFormAppeared = Array(linkPairs.length).fill(false);
        const newEditNamesState = linkPairs.map(pair => pair.name);
        const newEditUrlsState = linkPairs.map(pair => pair.url);
        
        setEditLinkFormAppeared(newEditFormAppeared);
        setEditLinksNamesState(newEditNamesState);
        setEditLinksUrlsState(newEditUrlsState);
        
    }, [links]);

    useEffect(()=>{
        const now=new Date()
        const tokenExpiry=new Date(token.expiresIn)
        if (now>tokenExpiry) {
          localStorage.removeItem("token")
          navigate("/login")
        }
    },[])

    useEffect(()=>{
        const timeOutId=setTimeout(()=>{IsMounted.current=true},0)
        return ()=>clearTimeout(timeOutId)
    },[])

    useEffect(()=>{
        if(IsMounted.current){
          handleSubmitChanges()
        }
    },[formData])

    const cancelChanges=()=>{
         setResumeState(formData.resume);
        setLinks(formData.links); // Reset to object
        setSkills(formData.skills);
        setAvatar(formData.avatar);
        setNotification({ ...notification, show: false });}
    
    const handleSubmitChanges = async () => {
        const formDataToSubmit = new FormData();
        
        // Convert other fields normally
        formDataToSubmit.append('avatar', formData.avatar);
        formDataToSubmit.append('name', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('experience', formData.experience);
        formDataToSubmit.append('status', formData.status);
        formDataToSubmit.append('summary', formData.summary);
        formData.skills.forEach(skill => {
            formDataToSubmit.append('skills', skill);
        });
      
        // Send links as JSON string of the object
        Object.entries(formData.links).forEach(([key, value]) => {
            formDataToSubmit.append(`links[${key}]`, value);
        });
        
        formDataToSubmit.append('resume', formData.resume);
        
       
        
        try {
            const response = await fetch(`http://localhost:7050/api/crud/${user.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token.token}`
                },
                body: formDataToSubmit
            });
            
            const data = await response; // Parse JSON response
            
            if (!response.ok) {
                setNotification({
                    message: data.message || "Failed to submit changes",
                    type: "red-background",
                    show: true,
                    actions: []
                });
                throw new Error("Failed to submit changes");
            }
            
            // Update local storage with new data
            const updatedUser = {
                ...user,
                avatar: formData.avatar,
                name: formData.fullName,
                email: formData.email,
                experience: formData.experience,
                status: formData.status,
                summary: formData.summary,
                skills: formData.skills,
                links: formData.links,
                resume: formData.resume
            };
            // localStorage.setItem("user", JSON.stringify(updatedUser));
            // setUser(updatedUser);
            
            setNotification({
                message: "Changes submitted successfully",
                type: "blue-background",
                show: true,
                actions: []
            });
            
        } catch (err) {
            console.error("Error submitting changes:", err);
            setNotification({
                message: "Failed to submit changes",
                type: "red-background",
                show: true,
                actions: []
            });
        }
    };
    
    useEffect(() => {
        if (IsMounted.current) {
            const hasChanges = JSON.stringify(formData.skills) !== JSON.stringify(skills) ||
                             JSON.stringify(formData.links) !== JSON.stringify(links) || // Compare objects
                             formData.resume !== resumeState;
            
            if (hasChanges) {
                setNotification({
                    message: 'Submit Changes',
                    type: 'green-background',
                    show: true,
                    actions: [
                        {
                            action: 'Submit',
                            onClick: () => {
                                setFormData({
                                    ...formData,
                                    skills: skills,
                                    links: links, // Submit object
                                    resume: resumeState,
                                    avatar: avatarFormData
                                });
                                setNotification({ ...notification, show: false });
                            }
                        },
                        {
                            action: 'Cancel',
                            onClick: cancelChanges
                        }
                    ]
                });
            }
        }
    }, [links, skills, resumeState]);

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
                setEditLinkFormAppeared(Array(linksArray.length).fill(false)) // Fixed: use linksArray.length
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [linksArray.length]); // Fixed: add dependency

    const handleAvatarChange=(e)=>{
        let file = e.target.files[0];
        console.log(file)
        if(file){
            const url=URL.createObjectURL(file)
            setAvatar(url)
            setAvatarFormData(file)
        }
    }

    const handleRemoveSkill=(skill)=>{
        const newSkills=skills.filter(s=>s!==skill) 
        setSkills(newSkills)
        handleShowSubmitNotification()
        console.log("show called")
    }

    // Fixed: Better handling of adding links
    const handleAddLink = () => {
        const newLinkName = linkNameRef.current.value.trim();
        const newLinkUrl = linkUrlRef.current.value.trim();
        
        if (!newLinkName || !newLinkUrl) return;
        
        // Add to the links object
        const updatedLinks = {
            ...links,
            [newLinkName]: newLinkUrl
        };
        
        setLinks(updatedLinks);
        setAddLinkFormAppeared(false);
        
        // Clear the input fields
        linkNameRef.current.value = '';
        linkUrlRef.current.value = '';
    };

    const handleRemoveLink = (linkToRemove) => {
        const updatedLinks = { ...links };
        delete updatedLinks[linkToRemove.name]; // Remove by key (name)
        setLinks(updatedLinks);
    };

    // Fixed: Better handling of opening edit form
    const handleOpenEditLinkForm=(index)=>{
        const newEditFormAppeared = Array(linksArray.length).fill(false);
        newEditFormAppeared[index] = true;
        setEditLinkFormAppeared(newEditFormAppeared);
    }

    // Fixed: Better state management for name changes
    const handleNameChange = (index, value) => {
        setEditLinksNamesState((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = value;
            return updatedState;
        });
    };
      
    // Fixed: Better state management for URL changes
    const handleUrlChange = (index, value) => {
        setEditLinksUrlsState((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = value;
            return updatedState;
        });
    };

    // Fixed: Better handling of submitting edited links
    const handleSubmitEditLink = (index) => {
        const oldName = linksArray[index].name;
        const newName = editLinksNamesState[index];
        const newUrl = editLinksUrlsState[index];
        
        // Validate inputs
        if (!newName.trim() || !newUrl.trim()) return;
        
        const updatedLinks = { ...links };
        
        // If name changed, remove old key and add new one
        if (oldName !== newName) {
            delete updatedLinks[oldName];
        }
        updatedLinks[newName.trim()] = newUrl.trim();
        
        setLinks(updatedLinks);
        
        // Close all edit forms
        setEditLinkFormAppeared(Array(linksArray.length).fill(false));
    };

    // Add this missing function
    const handleShowSubmitNotification = () => {
        // This function seems to be called but not defined in your original code
        // You might want to implement the logic here or remove the calls to it
        console.log("Submit notification should be shown");
    };

    useEffect(()=>{
        console.log(skills)
    },[skills])

    return (
        <div className='dashboard-page-container'>
            <Header 
              onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
              sidebarOpen={sidebarOpen}
            />

           {lastPath==='dashboard' && <Notification title= {notification.message} actions= {notification.actions} showNotification={notification.show} type={notification.type}/>}
            <div className='dashboard-page-content'>

                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                
                <div className='dash-user-info'>
                    <div className='basic-info dashboard-card'>

                        <div className='dash-user-info-avatar'>
                            <div>
                             { avatar? <img src={avatar}  />: <PersonIcon />}
                            </div>
                           {lastPath==='dashboard' && <button className="edit-icon">
                                <label htmlFor='edit-avatar'><EditTwoToneIcon /></label>
                                <input  onChange={handleAvatarChange} type='file' id='edit-avatar' style={{display: 'none'}} />
                            </button>
                           }
                        </div>

                        <div className='basic-info-form-area' >
                            <div className='basic-info-form-area-row'>
                                    <div>
                                    <label htmlFor='full-name'>Full Name</label>
                                    <input value={fullNameState} disabled={lastPath!=='dashboard'} onChange={(e)=>{setFullNameState(e.target.value)}} type='text' name='full-name' className="form-control" placeholder='Full Name'/>
                                    </div>

                                    <div>
                                    <label htmlFor='email'>Email</label>
                                    <input value={emailState} disabled={lastPath!=='dashboard'} onChange={(e)=>{setEmailState(e.target.value)}} type='text' name='email' className="form-control" placeholder='john.doe@example.com' />
                                     </div>
                            </div>

                            <div className='basic-info-form-area-row'>
                            <div  >
                                <label htmlFor='experience'>Experience</label>
                                    <select value={experienceState} disabled={lastPath!=='dashboard'}
                                     onChange={(e)=>{
                                       
                                        setExperienceState(e.target.value)
                                        console.log(e.target.value)
                                        }} 
                                        className='form-control' name='experience'>
                                        <option value='1'>Beginner</option>
                                        <option value='2'>Intermediate</option>
                                        <option value='3'>Advanced</option>
                                        <option value='4'>Expert</option>
                                        <option value='5'>Senior</option>
                                    </select>
                                    </div>
                                    <div>
                                <label htmlFor='status'>Status</label>
                                    <select value={statusState} disabled={lastPath!=='dashboard'} onChange={(e)=>{
                                      
                                        setStatusState(e.target.value)}} className='form-control' name='status'>
                                        <option value='1'>Available</option>
                                        <option value='2'>Hired</option>
                                        <option value='3'>On Leave</option>
                                        <option value='4'>Intern</option>
                                        <option value='5'>Senior</option>
                                    </select>
                                    </div>
                            </div>
                        <div style={{width:'30%', display:'flex',justifyContent:'space-between'}}>
                           <button  className={( formData.avatar!==avatarFormData  ||formData.fullName!==fullNameState || formData.email!==emailState || formData.experience!==experienceState || formData.status!==statusState) ? 'btn btn btn-outline-primary btn-sm' : 'hidden'} 
                           
                           onClick={()=>{setAvatarFormData(formData.avatar);setFullNameState(formData.fullName);setEmailState(formData.email);setExperienceState(formData.experience);setStatusState(formData.status)}} >Discard changes</button> 
                         

                        {lastPath==='dashboard' && <button   className={( formData.avatar!==avatarFormData  ||formData.fullName!==fullNameState || formData.email!==emailState || formData.experience!==experienceState || formData.status!==statusState) ? 'btn btn-primary btn-sm' : 'hidden'}
                            onClick={()=>{
                              
                                setFormData({...formData,avatar:avatarFormData,fullName:fullNameState,email:emailState,experience:experienceState,status:statusState}); 
                          
                                }}
                         >Save</button>
                        }   
                        </div>
                        </div>
                   </div>
                   <div  className='technical-info'>
                        <div className='summary-input-area dashboard-card'>
                            <label htmlFor='summary'>Summary</label>
                            
                            <textarea 
                                ref={summaryRef} 
                                disabled={lastPath!=='dashboard'} 
                                type='text' 
                                name='summary' 
                                value={summaryState || ''}
                                placeholder='Write a summary about yourself'  
                                onChange={(e)=>{setSummaryState(e.target.value)}}
                            />
                            <div><button className={((formData.summary || '') === (summaryState || '')) ? 'hidden' : ''} onClick={()=>{
                                setFormData({...formData,summary:summaryState})
                                
                                }}>Save</button></div>
                        </div>

                        <div className='tech-stack-area dashboard-card'>
                        Tech stack
                        <div className='tech-stack-container'>
                                
                                {skills.length >0?
                                    skills.map((skill,index)=>{
                                    return <div key={index}   onClick={()=>  {    lastPath==='dashboard' ?  handleRemoveSkill(skill) : null}}  className='skill'>{skill}</div>
                                    }):
                            <div style={{width:'100%', textAlign:'center'}}>No skills found</div>
                            }
                            { 
                            lastPath==='dashboard' && <input
                              id="add-skill-input"
                              className={addSkillInputAppeared ? 'add-skill-input-appeared' : 'add-skill-input-hidden'}
                              placeholder="Add Skill"
                              onFocus={() => setAddSkillInputAppeared(true)}
                              onBlur={() => setAddSkillInputAppeared(false)}
                              onKeyDown={(e)=>{
                                if(e.key==='Enter'&& e.target.value){
                                   
                                    setSkills([...skills,e.target.value])
                                   handleShowSubmitNotification()
                                    e.target.value=''
                                }
                              }}
                            />
                            }    
                        </div>
                        </div>

                            <div className='links-area dashboard-card'>
                               Links
                               <div className='links-items-container'>
                               {linksArray && linksArray.length > 0 ? 
        linksArray.map((link, index) => {
            return (
                <div key={index} className='link-item'>
                    <div className='link-container'>
                        <div className='link-item-logo'>
                            <SocialIcon style={{width: 35, height: 35}} url={link.url} />
                            <span>{link.name}</span>
                        </div>
                        <span>{link.url}</span>
                        {lastPath === 'dashboard' && (
                            <div>
                                <EditTwoToneIcon 
                                    className='edit-icon' 
                                    onClick={() => handleOpenEditLinkForm(index)}
                                />
                                <DeleteTwoToneIcon 
                                    onClick={() => handleRemoveLink(link)}
                                />
                            </div>
                        )}
                    </div>

                    <div id='edit-link-form' className={editLinkFormAppeared[index] ? 'add-link-form' : 'hidden'}>
                        <input 
                            className='edit-link-form-input'
                            type='text' 
                            placeholder={link.name}
                            value={editLinksNamesState[index] || ''}
                            onChange={(e) => handleNameChange(index, e.target.value)}
                        />
                        {lastPath === 'dashboard' && (
                            <input 
                                className='edit-link-form-input'
                                style={{width: '100%'}} 
                                type='text' 
                                placeholder={link.url}
                                onChange={(e) => handleUrlChange(index, e.target.value)}
                                value={editLinksUrlsState[index] || ''}
                            />
                        )}
                        <CheckTwoToneIcon onClick={() => handleSubmitEditLink(index)} />
                    </div>
                </div>
            );
        }) : 
        <div>No links found</div>
                           }
                           {lastPath==='dashboard' && <div id='add-link-form' className={addLinkFormAppeared ? 'add-link-form' : 'hidden'}>
                            <input 
                            ref={linkNameRef}
                             type='text' placeholder='Link Name' />
                            <input 
                            ref={linkUrlRef}
                            style={{width:'100%'}} type='text' placeholder='Link URL' />
                            <AddTwoToneIcon onClick={handleAddLink}/>
                           </div>
                           }

                                </div>
                               </div>

                        <div className="resume-area dashboard-card">
                            {lastPath==='dashboard' && <input id='resume-upload' name='resume-upload' type='file' accept='.pdf,.doc,.docx' 
                             onChange={(e)=>{
                                
                                setResumeState(e.target.files[0])
                                handleShowSubmitNotification()
                                }}/>}
                            <img src={pdfImage} alt='upload resume' />
                            {lastPath==='dashboard' ? <label htmlFor='resume-upload'>{resumeState ? resumeState.name : 'Upload Resume'}</label> : <div>Resume Name</div>}
                            <div> Accepted files: pdf, doc, docx </div>
                        </div>
                   </div>
                </div>
               
            </div>
        </div>
    );
};

export default Dashboard;