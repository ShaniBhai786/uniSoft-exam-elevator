import React from 'react'
import { Link } from 'react-router-dom'

function Selection() {
  return ( 
    <>
     <div className="selection-container">
     <div className="box1">
        <Link to="self-select" className='self-selection'>Self Selection</Link>
     </div>
     <div className="box2">
        <Link to="random-select" className='random-selection'>Random Selection</Link>
     </div>   
     </div> 
    </>
  )
}

export default Selection
