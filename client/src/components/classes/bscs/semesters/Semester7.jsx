import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Semester7() {
  return (
    <div className='syllabus-container'>
      <h2>BSCS Semester 7th</h2>
      <div className="services-links">
        {/* <Link to='/institute/software/bscs/semester7' className='link-item'>Go Back</Link> */}
        <Link to='outline7th' className='link-item'>Discover Outline</Link>
        <Link to='pastpapers7th' className='link-item'>Past Papers</Link>
      </div>
        <Outlet />
    </div>
  )
}

export default Semester7
