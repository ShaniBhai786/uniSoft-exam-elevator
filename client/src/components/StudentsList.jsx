import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function StudentsList() {
  const [users, setUsers] = useState([]) 
  useEffect(() => {
    const getUsers = async () => {
        try {
        const response = await axios.get("http://localhost:3001/api/v2/institutes/get-institutes", {
          withCredentials: true
        })      
        setUsers(response.data.data)
        console.log(response.data.data)
    } catch (error) {
      console.log("Error Fetching Users", error)
    }
  }
  getUsers()
  }, [])
  return (
    <>
     <div className="container">
        <h1>Student's List</h1>
        {users.map((institute, index) => {
          return(
            <div key={index} className="institute_card">
              <img src={institute.profile} alt="institute logo" width="121px" />
              <h2>{institute.name}</h2>
              <a href={`mailto:${institute.email}`}>{institute.email}</a>
              <p>{institute.about}</p>
              <a href={`tel:${institute.contact}`}><p>{institute.contact}</p></a>
              <p>{institute.address}</p>
            </div>
          )
        })}
        <Link to="/institute/admin-tools" >Go Back</Link>
     </div> 
    </>
  )
}

export default StudentsList
