import React, { useContext } from 'react'
import UserContex from '../context/User';
import './Profile.css';
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {
    
  return (
    <aside className='profile py-5  mt-5'>
        <div className='profile-link ' >
           
                <nav  className='py-5 '>
                <Link to='' >info</Link>
                <Link to='contact'>contact</Link>
                <Link to='order' >order</Link>
                </nav>
           
        </div>
        <div className='userData'>
          <Outlet/>
        </div>
        
    </aside>
   
  )
}
