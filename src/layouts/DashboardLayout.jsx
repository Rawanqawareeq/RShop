import React from 'react'
import Navbar from '../component/dashboard/navbar/Navbar'
import Footer from '../component/dashboard/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
   
    <> 
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}
