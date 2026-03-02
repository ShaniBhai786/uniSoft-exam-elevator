import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Class9th() {
  return (
    <>
      <div className="class-container">
            <Outlet />
        <h2>Class 9th Books</h2>
        <div className="books-div">
            <Link to="English"><div className="book">English</div></Link>
            <Link to="Physics"><div className="book">Physics</div></Link>
            <Link to="Computer"><div className="book">Computer</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
            <Link to="English"><div className="book">English</div></Link>
        </div>
      </div>
    </>
  )
}

export default Class9th
