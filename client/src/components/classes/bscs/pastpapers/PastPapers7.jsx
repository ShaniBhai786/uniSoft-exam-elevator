import React, { useState } from 'react'
import { semesterSeven } from './7thsemsterpastpaper'

function PastPapers7() {
    const [year, setYear] = useState(null)
    const [subject, setSubject] = useState("")
  return (
    <div className='pastpapers-container'>
    <div className="pastpapers-header">
        <h1>Past Papers</h1>
        <strong className='gen-tag'>Generate with us...!</strong>
    </div>
        {/* Select Year: */}
        <select name="year" id="year" onChange={(e) => setYear(parseInt(e.target.value))}>
            <option value={null}>Choose Year</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
        </select>
        
        {/* Select Subject: */}
        <select name="subject" id="subject" onChange={(e) => setSubject(e.target.value)}>
            <option value="">Choose Subject</option>
            <option value="numerical computing">Numerical Computing</option>
            <option value="technical and business writing">Technical and Business Writing</option>
            <option value="software project management">Software Project Management</option>
            <option value="software quality assurance">Software Quality Assurance</option>
        </select>
      
      <div className="papersDiv">
        <h2>Short Questions</h2> 
        {semesterSeven.map((item, index) => {
            return (
                item.year === year && item.Subject === subject && item.category === "short" ? 
                    <ul key={index}>
                        <li>{item.question}</li>
                    </ul>
                : null
            )
        })}

        <h2>Long Questions</h2>
        {semesterSeven.map((item, index) => {
            return (
                item.year === year && item.Subject === subject && item.category === "long" ? 
                    <ul key={index}>
                        <li>{item.question}</li>
                    </ul>
                : null
            )
        })}
      </div>
    </div>
  )
}

export default PastPapers7
