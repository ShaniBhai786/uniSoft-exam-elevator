import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Bscs() {
  return (
    <>
     <div className="class-container">
        <h2>BSCS Program</h2>
        <Outlet />
        <div className="books-div">
            <Link to="semester1" className='semester-links'><div className="book">Semester 1</div></Link>
            <Link to="semester2" className='semester-links'><div className="book">Semester 2</div></Link>
            <Link to="semester3" className='semester-links'><div className="book">Semester 3</div></Link>
            <Link to="semester4" className='semester-links'><div className="book">Semester 4</div></Link>
            <Link to="semester5" className='semester-links'><div className="book">Semester 5</div></Link>
            <Link to="semester6" className='semester-links'><div className="book">Semester 6</div></Link>
            <Link to="semester7" className='semester-links'><div className="book">Semester 7</div></Link>
            <Link to="semester8" className='semester-links'><div className="book">Semester 8</div></Link>
        </div>
     </div> 
    </>
  )
}

export default Bscs
