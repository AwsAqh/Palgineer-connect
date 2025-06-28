import React from 'react'
import "../styles/notification.css"
const Notification = ({title,actions,showNotification,type}) => {

    
  return (
    <div className={`notification-container ${showNotification ? `flex-container ${type}` : 'hidden'}`}>
      <div className='notification-title flex-container'>
        <div>{title}</div>
      </div>
      <div className='notification-body flex-container'>
        {actions?.map((action,index)=> <button onClick={action.onClick} key={index}>{action.action}</button>  )} 

      </div>
    </div>
  )
}

export default Notification
