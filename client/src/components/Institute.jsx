import React, {useState, useRef} from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation } from 'react-router-dom';
import Software from './Software'; 

function Institute() {
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState(true) 
 
  const location = useLocation()
  const data = location.state?.data || JSON.parse(localStorage.getItem("instituteData"));

  const title = document.querySelector(".title")
  title.innerHTML = data ? data.name : "uniSoft Test Solutions"

  const favicon = document.querySelector(".favicon")
  favicon.href = data ? data.profile : ""
  favicon.classList.add("favicon")
  const btnRef = useRef()
  
  if (!data) {
    return <h2>No Institute Data Available</h2>
  }
  
 

  return (
    <div className="institute">
        <NavBar data={data} />
        <Outlet />
        {/* <Link to="user-auth"><button className="btnLoginSignUp" ><FontAwesomeIcon icon={faRightToBracket} />Login/SignUp</button></Link> */}
        {/* <Software /> */}
        {
          display && <div className="welcome">
          <div className="welcome-text">
            <h1>Welcome to uniSoft Exam Elevator</h1>
            <p>Explore the software and resources available for your institute.</p>
          </div>
          <div className="buttons">
            <Link to="software"><button id='welcome-btn'onClick={()=> setDisplay(false)} >Explore Software</button></Link>
          </div>
        </div>
        }
    </div>
  )
}

export default Institute