import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Styles/find_eng.css"
import Header from '../Componetns/header'
import Sidebar from '../Componetns/sideBar'
import Footer from '../Componetns/footer'
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

const FindEng = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        experience: '',
        status: '',
        location: ''
    });
    
    // Mock data - replace with actual API call
    const mockEngineers = Array.from({length: 23}, (_, i) => ({
        id: i + 1,
        name: 'Aws Aqhash',
        title: 'Frontend Engineer',
        experience: '1 Year',
        status: 'Hired',
        location: 'Remote'
    }));
    
    const itemsPerPage = 5;
    
    // Memoized filtered results
    const filteredEngineers = useMemo(() => {
        return mockEngineers.filter(engineer => {
            const matchesSearch = engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                engineer.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesExperience = !filters.experience || engineer.experience === filters.experience;
            const matchesStatus = !filters.status || engineer.status === filters.status;
            const matchesLocation = !filters.location || engineer.location === filters.location;
            
            return matchesSearch && matchesExperience && matchesStatus && matchesLocation;
        });
    }, [searchTerm, filters, mockEngineers]);
    
    const totalPages = Math.ceil(filteredEngineers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentEngineers = filteredEngineers.slice(startIndex, startIndex + itemsPerPage);
    
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
    
    return (
        <div className='find-page-container'>
            <Header  
                onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
                sidebarOpen={sidebarOpen}
            />
           
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
                                    value={filters.experience}
                                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                                >
                                    <option value=''>All Experience</option>
                                    <option value='1 Year'>1 Year</option>
                                    <option value='2 Years'>2 Years</option>
                                    <option value='3+ Years'>3+ Years</option>
                                </select>

                                <select 
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                    <option value=''>All Status</option>
                                    <option value='Available'>Available</option>
                                    <option value='Hired'>Hired</option>
                                    <option value='Intern'>Intern</option>
                                    <option value='Contractor'>Contractor</option>
                                </select>

                                <select 
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                >
                                    <option value=''>All Locations</option>
                                    <option value='Remote'>Remote</option>
                                    <option value='On-site'>On-site</option>
                                    <option value='Hybrid'>Hybrid</option>
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
                                {currentEngineers.length > 0 ? (
                                    currentEngineers.map((engineer) => (
                                        <div className='results-row' key={engineer.id}>
                                            <div className='col name'>
                                                <div className='avatar'>
                                                    <PersonIcon/>
                                                </div>
                                                <div>
                                                    <div className='user-name' onClick={() => navigate(`/profile`)}>{engineer.name}</div>
                                                    <div className='user-extra'>{engineer.title}</div>
                                                </div>
                                            </div>
                                            <div className='col experience'>{engineer.experience}</div>
                                            <div className={`col status ${engineer.status}`}>  {engineer.status}</div>
                                            <div className='col actions'>
                                                <ArrowForwardIosTwoToneIcon onClick={() => navigate(`/profile`)}/>
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