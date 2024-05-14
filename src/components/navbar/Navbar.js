import React from 'react'
import './navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src='logo.svg' alt="" className='logo'/>
        <span>BuildMaster</span>
      </div>
      <div className='icons'>
        <img src='search.svg' alt='' className='icon'/>
        <img src='search.svg' alt='' className='icon'/>
        <img src='search.svg' alt='' className='icon'/>
        <div className='notification'>
          <img src='notifications.svg' alt='' className='icon'/>
          <span>1</span>
        </div>
        <div className='user'>
          <img src='https://images.pexels.com/photos/685531/pexels-photo-685531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
          <span>Jose</span>
        </div>
        <img src='settings.svg' alt='' className='icon'/>
      </div>
    </div>
  )
}

export default Navbar