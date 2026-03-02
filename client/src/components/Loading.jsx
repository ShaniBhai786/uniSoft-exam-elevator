import React from 'react'
import logo from "./logo.jpeg"

function Loading() {
  return (
    <>
     <div className="loading_container">
        <div className="loading">
            <div className="imgload"><img src={logo} alt="" /></div>
                <div className="dotsDiv">
                    <span>Working on it</span>
                    <span className='dot'></span>
                    <span className='dot'></span>
                    <span className='dot'></span>
                </div>
        </div>
     </div> 
    </>
  )
}

export default Loading
