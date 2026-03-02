import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Selection from '../Selection'

function Semester1() {
  return (
    <>
     <div className="syllabus-container">
      <span><Link to="/institute/software/bscs">back</Link></span>
      <h2>BSCS Semester 1</h2>
      <Selection />
      <Outlet />
     </div> 
    </>
  )
}

export default Semester1
