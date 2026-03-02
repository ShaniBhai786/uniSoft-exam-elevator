import React from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faHouse, faLayerGroup, faUser } from "@fortawesome/free-solid-svg-icons";

function Navlinks() {
  return (
    <>
     <div className="navLinks">
        <Link to="." className='links' ><span className="text">Home</span><FontAwesomeIcon className='icon' icon={faHouse} /></Link>
        <Link to="about" className='links' ><span className="text">About</span><FontAwesomeIcon className='icon' icon={faAddressCard} /></Link>
        <Link to="portal" className='links' ><span className="text">Portal</span><FontAwesomeIcon className='icon' icon={faLayerGroup} /></Link>
        <Link to="admin-tools" className='links' ><span className="text">Admin Tools</span><FontAwesomeIcon className='icon' icon={faUser} /></Link>
     </div> 
    </>
  )
}

export default Navlinks
