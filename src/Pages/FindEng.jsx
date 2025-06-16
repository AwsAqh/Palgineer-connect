import React, { useState } from 'react'
import "../Styles/find_eng.css"
import Header from '../Componetns/header'
import Sidebar from '../Componetns/sideBar'
import Footer from '../Componetns/footer'
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
const FindEng = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [resultNavigation, setResultNavigation] = useState(1);
    const [resultAmount, setResultAmount] = useState(11);
    const [resultNavigationOptions, setResultNavigationOptions] = useState(Math.ceil(resultAmount / 5));

  return (
    <div className='find-page-container'>
        <Header  onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen}/>
       
        <div className='find-page-content' >
        <Sidebar  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        <div className='find-page-content-main'>


            <div className='search-area'>
               <div className='search-area-form cardd'>
                    <input type='text' placeholder='Search' />
                    <div className='search-area-form-selects'>
                    <select>
                        <option value=''>Experience</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>

                    <select>
                        <option value=''>Status</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>

                    <select>
                        <option value=''>Location</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>
                </div>
                <button type="button" class="btn btn-light btn-sm width">Light</button>
                    
               </div>
            </div>



            <div className='search-results cardd'>
              

                    <div   className='results-table'>
                      <div className='results-header'>
                        <div className='col name'>Name</div>
                        <div className='col experience'>Experience</div>
                        <div className='col status'>Status</div>
                        <div className='col actions'>Actions</div>
                      </div>
                      <div className='results-body'>
                      {Array.from({length:resultNavigationOptions}).map((_,i)=>(
                        resultNavigation === i+1 &&
                        Array.from({length:Math.min(5,resultAmount - i*5)}).map((_,j)=>(

                          <div className='results-row' key={j}>
                            <div className='col name'>
                              <div className='avatar'><PersonIcon/></div>
                              <div>
                                <div className='user-name'>Aws Aqhash</div>
                                <div className='user-extra'>Frontend Engineer</div>
                              </div>

                            </div>
                            <div className='col experience'>1 Year</div>

                            <div className='col status'>Available</div>

                            <div className='col actions'><ArrowForwardIosTwoToneIcon/></div>

                          </div>
                        ))
                      ))}
                      </div>
                      <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li class="page-item disabled">
                                <a class="page-link">Previous</a>
                                </li>

                                {Array.from({length:resultNavigationOptions}).map((_,index)=>(
                                    <li onClick={()=>setResultNavigation(index+1)} class="page-item">
                                        <a class="page-link" href="#">{index + 1}</a>
                                    </li>
                                ))}
                                
                                <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                   

            
               
            </div>


           </div>
        </div>
    </div>
  )
}

export default FindEng
