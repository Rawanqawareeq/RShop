import React, { useContext } from 'react'
import UserContex from '../context/User';
import './profile.css';
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {
    
  return (
    <aside className='profile'>
        <div className='profile-link' >
           
                <nav>
                <Link to='' >info</Link>
                <Link to='contact' >contact</Link>
                <Link to='order' >order</Link>
                </nav>
           
        </div>
        <div className='userData'>
          <Outlet/>
        </div>
        
    </aside>
   
  )
}
