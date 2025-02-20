import React, { useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import { authcontext } from '../contexts/AuthContext'
import Loadingscreen from '../components/loadingscreen/Loadingscreen'

export default function Layout() {
  const {Isloading} =useContext(authcontext)
  return (
    <div>
      <Navbar />
      <div className="container px-5">
        {Isloading ? <Loadingscreen/> : <Outlet/> }
        
      </div>
      <Footer />
    </div>
  )
}
