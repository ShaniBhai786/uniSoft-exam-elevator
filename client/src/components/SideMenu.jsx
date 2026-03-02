import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'

function SideMenu() {
  const [loading, setLoading] = useState(false)
  const logOut = async() => {
    try {
      await axios.post("http://localhost:3001/api/v1/auth/logout", {}, {
        withCredentials: true
      }).then((res) => {
        setLoading(true)
        setTimeout(() => {
          console.log(res.data);
          window.location.assign("/")
          setLoading(false)
        }, 3000)
      })
    } catch (error) {
      alert("Error logging out, please try again.")
      console.error("Logout Error:", error);
    }
  }
  return (
    <>
    {loading && <Loading />}
     <div className="sideMenu">
        <div className="contents">
            <h3>UNISOFT EXAM ELEVATOR</h3>
            <div className="links-div">
                <Link to=""className='software-links'>Generate Paper</Link>
                <Link to=""className='software-links'>Saved Papers</Link>
                <Link to=""className='software-links'>Settings</Link>
                <Link className='software-links' onClick={logOut}>LogOut</Link>
            </div>
        </div>
     </div> 
    </>
  )
}

export default SideMenu
