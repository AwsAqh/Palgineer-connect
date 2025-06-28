import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import "../styles/find_eng.css"
import Header from '../Componetns/header'
import Sidebar from '../Componetns/sideBar'
import Footer from '../Componetns/footer'
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import Notification from '../Componetns/notification'
const FindEng = () => {

    const homeFilters = useLocation().state?.filters
    const navigate = useNavigate()
    const [notification,setNotification]=useState({
        message:"",
        actions:[],
        show:false,
        type:""
    })
    

    const levels={"Junior":1,"Mid-level":2,"Senior":3}
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("user")))
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const[fetchedEngineers,setFetchedEngineers]=useState([{}])
    const [filteredEngineers,setFilteredEngineers]=useState([{}])
    const [totalPages,setTotalPages]=useState( null)
    const [startIndex,setStartIndex]=useState( null)
    const [currentEngineers,setCurrentEngineers]=useState( null)
    const [filters, setFilters] = useState({
        experience: homeFilters?.experience || '',
        status: homeFilters?.status || '',
        role: homeFilters?.role || '',
        skills:[]
    });

    useEffect(()=>{


    },[])
        const localUser=JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{

        const fetchAllEngineers=async()=>{
            try{
                const response=await fetch(`${import.meta.env.VITE_API_URL}/api/crud`,{method :"GET"})
               
                const data=await response.json()
                console.log("fetch :0",data)
                if(!response.ok){
                    setNotification({
                        message:"Failed to fetch engineers",
                        type:"red-background",
                        show:true,
                        actions:[]
                    })
                }
                else{
                    setFetchedEngineers(data)
                    


                }

            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllEngineers()



    },[])
    const filteredEngineersMemo = useMemo(() => {
       
        return fetchedEngineers.filter(engineer => {
            
            const matchesSearch = engineer.name && (engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) || engineer.role.toLowerCase().includes(searchTerm.toLowerCase()))
            const matchesExperience = !filters.experience || levels[engineer.experience] >= levels[filters.experience];
            const matchesStatus = !filters.status || engineer.status === filters.status;
            const matchesRole = !filters.role || engineer.role === filters.role;
            const matchesSkill = searchTerm.length === 0
                ? true
                : engineer.skills?.some(skillStr => {
                 
                    const skillWords = skillStr
                    .toLowerCase()
                    .split(/\s+/);

                    // check if any of your search tokens is exactly one of these words
                    return searchTerm.toLowerCase().split(" ").some(term => skillWords.includes(term));
                });

           
            
            return ((matchesSearch||matchesSkill) && matchesExperience && matchesStatus && matchesRole );
        });
    }, [searchTerm, filters, fetchedEngineers]);

    useEffect(()=>{
      
    
    setFilteredEngineers(filteredEngineersMemo)
       

    },[fetchedEngineers,filteredEngineersMemo])

useEffect(()=>{
    setTotalPages(Math.ceil(filteredEngineers.length / itemsPerPage))
    setStartIndex((currentPage - 1) * itemsPerPage)
    setCurrentEngineers(filteredEngineers.slice(startIndex, startIndex + itemsPerPage))
},[filteredEngineers,currentPage,startIndex])
    
    const itemsPerPage = 5;
    
    

    
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setCurrentPage(1); // Reset to first page when filtering
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
     
        // Search functionality is handled by the useMemo above
    };

    const handleNavigateClick=(engineer)=>{

        
        
       
        if(!user || user._id!==engineer._id){
            navigate(`/profile/${engineer._id}`)
        }
        else{
            navigate(`/dashboard`)
        }
        

    }
    
    return (
        <div className='find-page-container'>
            <Header  
                onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
                sidebarOpen={sidebarOpen}
            />
            <Notification title={notification.message} actions={notification.actions} showNotification={notification.show} type={notification.type}/>
           
            <div className='find-page-content'>
                <Sidebar  
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen}
                />

                <main className='find-page-content-main'>
                    {/* Search Area */}
                    <section className='search-area'>
                        <form className='search-area-form' onSubmit={handleSearch}>
                            <input 
                                type='text' 
                                placeholder='Search engineers...' 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                            <div className='search-area-form-selects'>
                                <select 
                                    value={ homeFilters?.experience || filters.experience}
                                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                                >
                                    <option value=''>All Experience</option>
                                    <option value='Junior'>Junior</option>
                                    <option value='Mid-level'>Mid-level</option>
                                    <option value='Senior'>Senior</option>
                                </select>

                                <select 
                                    value={ homeFilters?.status || filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                    <option value=''>All Status</option>
                                    <option value='Available'>Available</option>
                                    <option value='Hired'>Hired</option>
                                    <option value='Intern'>Intern</option>
                                    <option value='Contractor'>Contractor</option>
                                    <option value='On Leave'>On Leave</option>
                                </select>

                                <select 
                                    value={ homeFilters?.role || filters.role}
                                        onChange={(e) => handleFilterChange('role', e.target.value)}
                                    >
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
                            </div>
                            
                            <button type="submit" className="search-btn">
                                Search ({filteredEngineers.length} results)
                            </button>
                        </form>
                    </section>

                    {/* Results Section */}
                    <section className='search-results'>
                        <div className='results-table'>
                            <div className='results-header'>
                                <div className='col name'>Name</div>
                                <div className='col experience'>Experience</div>
                                <div style={{color: "#fff"}} >Status</div>
                                <div className='col actions'>Actions</div>
                            </div>
                            
                            <div className='results-body'>
                                {currentEngineers&&currentEngineers.length > 0 ? (
                                    currentEngineers.map((engineer) => (
                                        <div className='results-row' key={engineer.id}>
                                            <div className='col name'>
                                                <div className={engineer.avatar? "" : "avatar"}>

                                                {engineer.avatar? <img style={{width:"60px",height:"60px",borderRadius:"50%"}} src={`${engineer.avatar}`} alt='avatar'/> : <PersonIcon/>}
                                                
                                                </div>
                                                <div>
                                                    <div className='user-name' onClick={() =>{
                                                    
                                                     handleNavigateClick(engineer)
                                                    }
                                                     }>{engineer.name} {engineer._id===user?._id && <span style={{color:"green"}}> (Me)</span>}</div>
                                                    <div className='user-extra'>{engineer.role}</div>
                                                </div>
                                            </div>
                                            <div className='col experience'>{engineer.experience}</div>
                                            <div className={`col status ${engineer.status}`}>  {engineer.status}</div>
                                            <div className='col actions'>
                                                <ArrowForwardIosTwoToneIcon onClick={() =>{   handleNavigateClick(engineer)}}/>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='no-results'>
                                        <p>No engineers found matching your criteria.</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <nav aria-label="Pagination Navigation">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link"
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>

                                        {Array.from({length: totalPages}, (_, index) => (
                                            <li 
                                                key={index + 1}
                                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                            >
                                                <button 
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link"
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default FindEng