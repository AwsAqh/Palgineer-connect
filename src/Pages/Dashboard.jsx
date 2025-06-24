import React, {useState, useRef, useEffect} from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
    const navigate=useNavigate()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [token,setToken] = useState(JSON.parse(localStorage.getItem("token")) || null)
    const lastPath = useLocation().pathname.split('/').pop();
    const {id} = useParams()
    const [noEngineerFound,setNoEngineerFound] = useState(false)
    const [engineerById,setEngineerById] = useState(null)
    const [errorGetEngineerById,setErrorGetEngineerById] = useState({})
    const [avatar,setAvatar] = useState(null);
    const [avatarFormData,setAvatarFormData] = useState(null)
    const [skills,setSkills] = useState(null);
    const [addSkillInputAppeared,setAddSkillInputAppeared] = useState(false);
    const[addLinkFormAppeared,setAddLinkFormAppeared] = useState(false);
    const [avatarIsChanged,setAvatarIsChanged] = useState(false);
    const [links,setLinks] = useState(null);
    const [linksMap,setLinksMap] = useState(null)
    const[editLinkFormAppeared,setEditLinkFormAppeared] = useState([]);
    const [fullNameState,setFullNameState] = useState(null);
    const [emailState,setEmailState] = useState(null);
    const [experienceState,setExperienceState] = useState(null); 
    const [statusState,setStatusState] = useState(null);
    const [roleState,setRoleState] = useState(null);
    const [resumeState,setResumeState] = useState(null);
    const [resumeStateName,setResumeStateName] = useState(null);  
    const [showNotification,setShowNotification] = useState(false);

    const [linksArray, setLinksArray] = useState([]) // Array for display
    const avatarRef = useRef(null);
    const[notification,setNotification] = useState({
        message:'',
        type:'',
        show:showNotification,
        actions:[]
    });

    const summaryRef = useRef(null);
    const [summaryState,setSummaryState] = useState(null);
    const linkNameRef = useRef(null);
    const linkUrlRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Fixed: Initialize these states properly
    const [editLinksNamesState, setEditLinksNamesState] = useState([]);
    const [editLinksUrlsState, setEditLinksUrlsState] = useState([]);

    const IsMounted=useRef(false)

    const [formData, setFormData] = useState(
        ()=>{

           if(lastPath==='dashboard'){  
                return {
        avatar: user?.avatar,
        fullName: user?.name,
        email: user?.email ,
        experience: user?.experience,
        status: user?.status ,
        role: user?.role ,
        summary: user?.summary ,
        skills: user?.skills ,
        links: user?.links ,
        resume: user?.resume 
                }
           }
          
        }
    );
    

    useEffect(()=>{
        if(lastPath==='dashboard'){
            localStorage.setItem("user",JSON.stringify(user))
        }
    },[])
        
    useEffect(()=>{
        if(lastPath==='dashboard'){
        setAvatarFormData(user&&user.avatar)
        setSkills(user&&user.skills)
        setLinks(user&&user.links || {})
        setResumeState(user&&user.resume)
        setResumeStateName(user&&user.resume.split('/').pop())
        setFullNameState(user&&user.name)
        setEmailState(user&&user.email)
        setExperienceState(user&&user.experience)
        setStatusState(user&&user.status)
        setRoleState(user&&user.role)
        setSummaryState(user&&user.summary ||"")
        }
    },[user])

    //Fetch engineer by id
    useEffect(()=>{
        const fetchEngineer=async()=>{
        
            console.log("fetching engineer by id",id)
            try{
                const response=await fetch(`http://localhost:7050/api/crud/${id}`,{method:"GET"})
                const data=await response.json()
                if(!response.ok){
                    setNoEngineerFound(true)
                }
                else{
                    setNoEngineerFound(false)
                    setEngineerById(data)
                }
            }
            catch(err){
                setNoEngineerFound(true)
                setErrorGetEngineerById(err)
            }
            
        }
        
            id&&fetchEngineer()
        
    },[id])

    // Fixed: Better useEffect for managing links arrays,initial links effect
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


    //secure page with token validation
    useEffect(()=>{
        if(lastPath==='dashboard' && token && user){
        const now=new Date()
        const tokenExpiry=new Date(token.expiresIn)
        if (now>tokenExpiry) {
          localStorage.removeItem("token")
          navigate("/login")
        }
    }
    if((!token || !user) && lastPath==='dashboard'){
        navigate("/login")
    }
    },[])


    //set mounted to true
    useEffect(()=>{
        
        const timeOutId=setTimeout(()=>{IsMounted.current=true},0)
      
        return ()=>clearTimeout(timeOutId)
    },[])



    //set avatar to user.avatar , for submitted avatar, it will be updated in the formData and in the UI
    useEffect(()=>{
        if(lastPath==='dashboard'){
        setAvatar(user&&user.avatar)
    }
    },[user&&user.avatar])

    useEffect(()=>{
        if(lastPath==='dashboard'){
        setResumeState(user&&user.resume); 
    }
    },[user&&user.resume])
    
    //submit changes to the server , call handleSubmitChanges
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
        setResumeStateName(formData.resume.split('/').pop());
        setResumeState(formData.resume);
        setNotification({ ...notification, show: false });}
    



    const handleSubmitChanges = async () => {
        const formDataToSubmit = new FormData();
        
        // Convert other fields normally
        formDataToSubmit.append('avatar', formData.avatar);
        formDataToSubmit.append('name', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('experience', formData.experience);
        formDataToSubmit.append('status', formData.status);
        formDataToSubmit.append('role', formData.role);
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
            console.log("user id in submit:",user._id)
            const response = await fetch(`http://localhost:7050/api/crud/${user._id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token.token}`
                },
                body: formDataToSubmit
            });
            
            const data = await response.json(); // Parse JSON response
            
            if (!response.ok) {
                setNotification({
                    message: data.message || "Failed to submit changes",
                    type: "red-background",
                    show: true,
                    actions: []
                });
                throw new Error("Failed to submit changes");
            }
            console.log("new avatar in submit:",data.updated.avatar)
            // Update local storage with new data
            const updatedUser = {
                ...user,
                avatar: data.updated.avatar,
                name: data.updated.name,
                email: data.updated.email,
                experience: data.updated.experience,
                status: data.updated.status,
                role: data.updated.role,
                summary: data.updated.summary,
                skills: data.updated.skills,
                links: data.updated.links,
                resume: data.updated.resume
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser)
            // localStorage.setItem("user", JSON.stringify(updatedUser));
            // setUser(updatedUser);
            
            setNotification({
                message: "Changes submitted successfully",
                type: "blue-background",
                show: true,
                actions: []
            });
            setAvatarIsChanged(false)
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



    
    //handle show submit notification after changes are made
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

    //add clicks listner on mount
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
        setAvatarIsChanged(true)
        let file = e.target.files[0];
       
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

   

    return (
        <div className='dashboard-page-container'>
            <Header 
              onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
              sidebarOpen={sidebarOpen}
            />

           {lastPath==='dashboard' && <Notification title= {notification.message} actions= {notification.actions} showNotification={notification.show} type={notification.type}/>}
            <div className='dashboard-page-content'>
                
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                {noEngineerFound ? <div>Engineer not found</div> :(
                <div className='dash-user-info'>
                  
                    <div className='basic-info dashboard-card'>

                        <div className='dash-user-info-avatar'>
                            <div>
                             { lastPath==='dashboard'? ( avatar   ? <img src={ avatarIsChanged ? avatar:`http://localhost:7050${avatar}`   }  />: <PersonIcon />) 
                             : (engineerById&&engineerById.avatar ? <img src={`http://localhost:7050${engineerById.avatar}`}  />: <PersonIcon />)
                             }
                            </div>


                           {lastPath==='dashboard' && <button className="edit-icon">
                                <label htmlFor='edit-avatar'><EditTwoToneIcon /></label>
                                <input ref={avatarRef} onTouchCancel={()=>{setAvatarIsChanged(false)}}  onChange={handleAvatarChange} type='file' id='edit-avatar' style={{display: 'none'}} />
                            </button>
                           }
                        </div>

                        <div className='basic-info-form-area' >
                            <div className='basic-info-form-area-row'>
                                    <div>
                                    <label htmlFor='full-name'>Full Name</label>
                                    <input value={lastPath==='dashboard' ? fullNameState : engineerById&&engineerById.name} disabled={lastPath!=='dashboard'} onChange={(e)=>{setFullNameState(e.target.value)}} type='text' name='full-name' className="form-control" placeholder='Full Name'/>
                                    </div>

                                    <div>
                                    <label htmlFor='email'>Email</label>
                                    <input value={lastPath==='dashboard' ? emailState : engineerById&&engineerById.email} disabled={lastPath!=='dashboard'} onChange={(e)=>{setEmailState(e.target.value)}} type='text' name='email' className="form-control" placeholder='john.doe@example.com' />
                                     </div>
                            </div>

                            <div className='basic-info-form-area-row'>
                            <div  >
                                <label htmlFor='experience'>Experience</label>
                                    <select value={lastPath==='dashboard' ? experienceState : engineerById&&engineerById.experience} disabled={lastPath!=='dashboard'}
                                     onChange={(e)=>{
                                       
                                        setExperienceState(e.target.value)
                                        console.log(e.target.value)
                                        }} 
                                        className='form-control' name='experience'>
                                        
                                        <option value='Junior'>Junior</option>
                                        <option value='Mid-level'>Mid-level</option>
                                        <option value='Senior'>Senior</option>
                                    </select>
                                    </div>
                                    <div>
                                <label htmlFor='status'>Status</label>
                                    <select value={lastPath==='dashboard' ? statusState : engineerById&&engineerById.status} disabled={lastPath!=='dashboard'} onChange={(e)=>{
                                      
                                        setStatusState(e.target.value)}} className='form-control' name='status'>
                                        <option value='Available'>Available</option>
                                        <option value='Hired'>Hired</option>
                                        <option value='On Leave'>On Leave</option>
                                        <option value='Intern'>Intern</option>
                                        <option value='Contractor'>Contractor</option>
                                        
                                    </select>
                                    </div>
                                    <div >
                                    <label htmlFor='role'>Role</label>
                                    <select value={lastPath==='dashboard' ? roleState : engineerById&&engineerById.role} disabled={lastPath!=='dashboard'} onChange={(e)=>{
                                        setRoleState(e.target.value)
                                        
                                        }} className='form-control' name='role'>
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
                            </div>
                        <div style={{width:'30%', display:'flex',justifyContent:'space-between'}}>

                          {lastPath==='dashboard' && <button  className={( formData.avatar!==avatarFormData  ||
                           formData.fullName!==fullNameState ||
                            formData.email!==emailState ||
                             formData.experience!==experienceState ||
                              formData.status!==statusState ||
                               formData.role!==roleState) ? 'btn btn btn-outline-primary btn-sm' : 'hidden'} 
                           
                           onClick={()=>  { if(avatarRef.current){avatarRef.current.value=''}; 
                           setAvatarFormData(formData.avatar);
                           setFullNameState(formData.fullName);
                           setEmailState(formData.email);
                           setExperienceState(formData.experience);
                           setStatusState(formData.status);
                           setRoleState(formData.role);
                           setAvatarIsChanged(false) ;setAvatar(formData.avatar)}} >Discard changes</button> }
                         


                        {lastPath==='dashboard' && <button   className={( formData&&( formData.avatar!==avatarFormData  ||

                        formData.fullName!==fullNameState ||
                         formData.email!==emailState ||
                          formData.experience!==experienceState ||
                           formData.status!==statusState ||
                            formData.role!==roleState) ? 'btn btn-primary btn-sm' : 'hidden')}   
                            onClick={()=>{
                              
                                setFormData({...formData,avatar:avatarFormData,fullName:fullNameState,email:emailState,experience:experienceState,status:statusState,role:roleState}); 
                          
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
                                value={lastPath==='dashboard' ? summaryState : engineerById&&engineerById.summary}
                                placeholder='Write a summary about yourself'  
                                onChange={(e)=>{setSummaryState(e.target.value)}}
                            />

                           { lastPath==='dashboard' && <div><button className={formData.summary===summaryState ? 'hidden' : ''} onClick={()=>{
                                setFormData({...formData,summary:summaryState})
                                
                                }}>Save</button></div>}
                        </div>

                        <div className='tech-stack-area dashboard-card'>
                        Tech stack
                        <div className='tech-stack-container'>
                                
                                {lastPath==="dashboard"? ( skills&&skills.length >0?
                                    skills.map((skill,index)=>{
                                    return <div key={index}   onClick={()=>  {    lastPath==='dashboard' ?  handleRemoveSkill(skill) : null}}  className='skill'>{skill}</div>
                                    }):<div style={{width:'100%', textAlign:'center'}}>No skills found</div>)

                                    : (engineerById&&engineerById.skills.length >0? engineerById.skills.map((skill,index)=>{
                                        return <div key={index}   onClick={()=>  {    lastPath==='dashboard' ?  handleRemoveSkill(skill) : null}}  className='skill'>{skill}</div>
                                    }):<div style={{width:'100%', textAlign:'center'}}>No skills found</div>)
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
                               { lastPath==='dashboard' ? (linksArray && linksArray.length > 0 ? 
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
                                    <div>No links found</div>)
                                    :
                                    (engineerById&&engineerById.links && Object.keys(engineerById.links).length > 0 ? Object.keys(engineerById.links).map((link,index)=>{
                                        return <div key={index} className='link-item'>
                                            <div className='link-container'>
                                                <div className='link-item-logo'>
                                                    <SocialIcon style={{width: 35, height: 35}} url={engineerById.links[link]} />
                                                    <span>{link}</span> 
                                                </div>
                                                <span>{engineerById.links[link]}</span>
                                            </div>
                                        </div>
                                    }) : <div>No links found</div>)
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
                            onTouchCancel={()=>{setResumeStateName(user.resume);setNotification({...notification,show:false})}}
                             onChange={(e)=>{
                                
                                setResumeState(e.target.files[0])
                                setResumeStateName(e.target.files[0].name)
                                handleShowSubmitNotification()
                                }}/>}
                            <img src={pdfImage} alt='upload resume' />
                            {lastPath==='dashboard' ? ( resumeStateName && <div><a onClick={()=>{
                                
                                window.open(`http://localhost:7050${resumeState}`, '_blank');
                            }} href={`http://localhost:7050${resumeState}`} target='_blank' rel='noreferrer'>{resumeStateName}</a></div>)
                            :
                            (engineerById&&engineerById.resume && <div><a onClick={()=>{
                                window.open(`http://localhost:7050${engineerById.resume}`, '_blank');
                            }} href={`http://localhost:7050${engineerById.resume}`} target='_blank' rel='noreferrer'>{engineerById.resume.split('/').pop()}</a></div>  )}


                            {lastPath==='dashboard' ? <label htmlFor='resume-upload'>Change Resume</label> : <div>Resume Name</div>}
                            <div> Accepted files: pdf, doc, docx </div>
                        </div>
                   </div>
                </div>
                )}
               
            </div>
        </div>
    );
};

export default Dashboard;