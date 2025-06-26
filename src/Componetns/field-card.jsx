import React from 'react'
import '../styles/field-card.css'
import { useNavigate } from 'react-router-dom'
const FieldCard = ({field,description,e}) => {
  const navigate = useNavigate()
  return (
    <div className='card-container' onClick={()=>{navigate('/find',{state:{filters:{
  
      role:e
    }}})}}>
        <div className='card-title'>{field}</div>
        <div className='card-content'>
            {description}
            
        </div>
    </div>
  )
}

export default FieldCard;
