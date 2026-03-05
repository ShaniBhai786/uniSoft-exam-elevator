import React, { useState } from 'react'
import RegisterInstitute from './RegisterInstitute'
import Login from './Login'
import { Outlet } from 'react-router-dom'

function MainPage() {
  const [display, setDisplay] = useState(true)

  return (
    <>
      <div className="main">
        <Outlet />
        {
          display ? <Login onSwitch={() => setDisplay(false)} /> : <RegisterInstitute onSwitch={() => setDisplay(true)} />
        }
      </div>
    </>
  )
}

export default MainPage
