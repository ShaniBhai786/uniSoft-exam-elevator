import React, { useEffect, useState } from 'react'
import PaperFormat from '../../PaperFormat'
import {shortQuestions, longQuestions} from '../computer/chapter5' 

function Computer() {
  const [shortQuest, setShortQuest] = useState([])
  const [longQuest, setLongQuest] = useState([])

  const [selectedShortQuestions, setSelectedShortQuestions] = useState([])
  const [selectedLongQuestions, setSelectedLongQuestions] = useState([])

  const [showDataContainer, setShowDataContainer] = useState(false)
    const [state, setState] = useState([])

  const [questionStatus, setQustionStatus] = useState("important")
  const [longQuestionStatus, setLongQustionStatus] = useState("important")

  const handleShortCheckboxChange = (id) => {
    setShortQuest((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const handleLongCheckboxChange = (id) => {
    setLongQuest((prev) => prev.includes(id) ? 
    prev.filter((item) => item !== id) : [...prev, id])
  }

  useEffect(() => {
    const shortQuestionsIds = shortQuestions
    .filter((q) => shortQuest
    .includes(q.id))
    .map((q) => q.question)

    const longQuestionsIds = longQuestions
    .filter((q) => longQuest
    .includes(q.id))
    .map((q) => q.question)
    
    setSelectedShortQuestions([...shortQuestionsIds])
    setSelectedLongQuestions([...longQuestionsIds])
  }, [shortQuest, longQuest])

  const goto = () => {
    setShowDataContainer(true)
  }

  const dismiss = () => {
    setSelectedShortQuestions('')
    setSelectedLongQuestions('')
    setShowDataContainer(false)
  } 


  return (
    <>
    <div className="syllabus-container">
      <h1>9th Class Computer</h1>
      <h2>Chapter 5: Introduction to Descriptive Statistics</h2>

      <select name="status" id="status" onChange={(e) => setQustionStatus(e.target.value)}>
        <option value="important">Important Questions</option>
        <option value="normal">Ordinary Questions</option>
      </select>

      <div className="questions-section">
        <h3> Short Questions</h3>
        <ol> 
          {shortQuestions.map((item, index) => (
            item.type === questionStatus ?
            <li key={index} className='quest-row'>&nbsp;
              <input
                name={item.id}
                id={item.id}
                type="checkbox"
                checked={shortQuest.includes(item.id)}
                onChange={() => handleShortCheckboxChange(item.id)}
              />
              <label htmlFor={item.id} className='question'>{item.type === questionStatus ? item.question : null}</label>
            </li> : null 
          ))}
        </ol>
      </div>

      <select name="status" id="status" onChange={(e) => setLongQustionStatus(e.target.value)}>
        <option value="important">Important Questions</option>
        <option value="normal">Ordinary Questions</option>
      </select>

      <div className="questions-section">
      <h3>Long Questions</h3>
      <ol>
        {
          longQuestions.map((item, index) => (
            item.type === longQuestionStatus ?
                <li key={index} className='quest-row'>
                {index + 1}<input type="checkbox" checked={longQuest.includes(item.id)}
                onChange={()=> handleLongCheckboxChange(item.id)} />
                <label htmlFor={item.id} className='question'>
                  {item.type === longQuestionStatus ? item.question : null}
                </label>
              </li> : null
          ))
        }
      </ol>
      </div>
      
      <button onClick={goto} >Generate</button>
      {showDataContainer ?
      <div className="temp">
        <button onClick={() => setShowDataContainer(false)}>Close</button>
        <PaperFormat state={state} selectedShortQuestions={selectedShortQuestions} selectedLongQuestions={selectedLongQuestions} dismiss={dismiss} />
        
      </div>: null}

      
      </div>
    </>
  )
}

export default Computer
