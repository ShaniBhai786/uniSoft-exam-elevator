import React from 'react'
import SideMenu from './SideMenu'
import Body from './Body'
import { Outlet, useLocation } from 'react-router-dom'

function Software() { 
  const location = useLocation()
  const data = location.state?.data || JSON.parse(localStorage.getItem("instituteData"))
  return (
    <>
      <div className="mainPage">
        <aside className='asideLeft'><SideMenu /></aside>
        <Outlet />
        
        <Body data={data} />
      </div>
    </>
  )
}

export default Software
