import React, {useState} from 'react'
// import Physics from '../../Physics'
import PaperFormat from '../../PaperFormat'

function DataContainer({ selectedShortQuestions, selectedLongQuestions, dismiss }) {

  return (
    <>
      <div className="chapter-content">
        <div className="selected-questions-container">
        <h2>Short Questions</h2>
        {
          selectedShortQuestions.map((question, index) => {
            return(
              <div className='questRow' key={index}>
              <b>{index+1}. </b> <p key={index}>{question}</p>
              </div>
            )
          })
        }
      </div>

      <div className="selected-questions-container">
        <h2>Long Questions</h2>
        {
          selectedLongQuestions.map((question, index) => {
            return(
              <div className='questRow' key={index}>
              <b>{index+1}.&nbsp; </b> <p key={index}>{question}</p>
              </div>
            )
          })
        }
      </div>
      <button onClick={dismiss}>Dismiss</button>
        {/* <Physics />     */}


      </div>
    </>
  )
}

export default DataContainer;