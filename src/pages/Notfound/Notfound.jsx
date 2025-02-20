import React from 'react'
import img from "../../assets/404-status-code.png"
export default function Notfound() {
  return (
    <div>
      <img src={img} className='w-full' alt="404 not found" />
    </div>
  )
}
