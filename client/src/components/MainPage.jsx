import React, { useState } from 'react'
import RegisterInstitute from './RegisterInstitute'
import Login from './Login'

function MainPage() {
  const [display, setDisplay] = useState(true)

  return (
    <>
      <div className="main">
        {
          display ? <Login onSwitch={() => setDisplay(false)} /> : <RegisterInstitute onSwitch={() => setDisplay(true)} />
        }
      </div>
    </>
  )
}

export default MainPage
