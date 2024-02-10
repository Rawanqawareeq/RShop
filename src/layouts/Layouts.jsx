import React from 'react'
import Navbar from '../component/web/navbar/Navbar.jsx'
import Footer from '../component/web/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layouts() {
    

    return (
        <>
            <Navbar />
            <Outlet/>
            <Footer/>
        </>
    )
}
