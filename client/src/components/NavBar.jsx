import React from 'react'
import Navlinks from './Navlinks'
import logo from "./images/logo.jpeg"

function NavBar({data, onPortalClick}) {
  let title = data ? data.name : "uniSoft-Exam-Elevator"
  return (
    <>
      <div className="navBar">
        <div className="institute_logo_div">
          <img src={data.profile || logo} className='logo' alt="logo" />
        </div>
        <div className="institute_info">
            <div className="institute_title">
                <h1 className='title'>{title}</h1>
                <p className='salogan'>{data.about}</p>
            </div>
        </div>
        <Navlinks onPortalClick={onPortalClick} />
      </div>
    </>
  )
}

export default NavBar
