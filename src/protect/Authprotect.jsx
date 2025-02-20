import React, { useContext } from 'react'
import { authcontext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Authprotect({children}) {
 const {Isloggedin} =useContext(authcontext)
 
    return (
    <div>
        {!Isloggedin ? children : <Navigate to={"/"} /> }
    </div>
  )
}
