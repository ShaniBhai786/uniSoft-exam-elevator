import React from 'react'
import { Link } from 'react-router-dom'
import class9 from "./images/class9th.png"
import class10 from './images/class10th.png'
import class11 from './images/class11th.png'
import class12 from './images/class12th.png'
import bscs from './images/bscs.png'

function Body({data}) {
  return (
    <>
     <div className="body">
        <div className="userInfo">
            <img src={data?.profile} className='masterImage' alt="User Profile" />
            <h3 className='masterUser'>Master User: <strong className='m-text'>{data?.masterUser}</strong></h3>
        </div>
        <div className="classes">
            <div className="plan" >
            <Link to="class9th" className="software-link">
            <img src={class9} alt="classimage" />
            <h4>9th Class</h4>
            </Link>
        </div>
        <div className="plan">
            <Link className="software-link">
            <img src={class10} alt="classimage" />
            <h4>10th Class</h4>
            </Link>
        </div>
        <div className="plan" >
            <Link to="home" className="software-link">
            <img src={class11} alt="classimage" />
            <h4>1st Year</h4>
            </Link>
        </div>
        <div className="plan">
            <Link className="software-link">
            <img src={class12} alt="classimage" />
            <h4>2nd Year</h4>
            </Link>
        </div>
        <div className="plan">
            <Link to="bscs" className="software-link">
            <img src={bscs} alt="classimage" />
            <h4>BSCS</h4>
            </Link>
        </div>
        </div>
     </div> 
    </>
  )
}

export default Body
