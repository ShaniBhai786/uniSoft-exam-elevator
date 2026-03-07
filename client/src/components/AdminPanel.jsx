import React from 'react'
import { Link, Outlet } from "react-router-dom"

function AdminPanel() {
  return (
    <>
     <div className="container">
        <h1>Admin Panel</h1>
        <div className="tools">
            <Link to="students-list" className='servicesLinks'>Students List</Link>
            <Link to="fee" className='servicesLinks'>Fee Submission</Link>
            <Link to="results" className='servicesLinks'>Results</Link>
        </div>
            <Outlet />
     </div> 
    </>
  )
}

export default AdminPanel
