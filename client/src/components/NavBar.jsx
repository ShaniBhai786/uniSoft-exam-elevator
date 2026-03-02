import React from 'react'
import Navlinks from './Navlinks'

function NavBar({data, onPortalClick}) {
  return (
    <>
      <div className="navBar">
        <div className="institute_logo_div">
          <img src={data.profile} className='logo' alt="logo" />
        </div>
        <div className="institute_info">
            <div className="institute_title">
                <h1 className='title'>{data.name}</h1>
                <p className='salogan'>{data.about}</p>
            </div>
        </div>
        <Navlinks onPortalClick={onPortalClick} />
      </div>
    </>
  )
}

export default NavBar
