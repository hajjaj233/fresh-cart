import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authcontext } from '../contexts/AuthContext'

export default function Protectedroute({children}) {
  const {Isloggedin} = useContext(authcontext)
  return (
    <div>
        {Isloggedin ? children : <Navigate to={"/login"}/> }
    </div>
  )
}
