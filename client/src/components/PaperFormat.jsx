import React from 'react'
import logo from './images/logo.jpeg'
import DataContainer from './books/class9th/DataContainer'
import { useLocation } from 'react-router-dom';
import axios from "axios"

function PaperFormat({state, selectedShortQuestions, selectedLongQuestions, dismiss}) {
    // axios
     const location = useLocation()
  const data = location.state?.data || JSON.parse(localStorage.getItem("instituteData"));
  console.log(data);
  
  return (
    <div className='paperFormat'>
      <div className="testDiv">
        <div className="header">
            <div className="monogram">
                <div className="logoDiv">
                <img src={data.profile} alt="" id='testlogo' className="logo" />
            </div>
            <div className="titleDiv">
                <h2 className="name">{data.name}</h2>
                <p className="salogan" style={{color: "black"}}>{data.about}</p>
            </div>
            </div>
            <div className="details">
                <h5 className="grade">Class 9th</h5>
                <h5 className="paper">Chemistry</h5>
                <h5 className="marks">Maximum Marks: </h5>
            </div>
            <div className="details">
                <h5 className="paper">Exam Type:</h5>
                <h5 className="marks">Time Allowed:</h5>
                <h5 className="marks">Obtain Marks:_____________________</h5>
            </div>
            <div className="details">
                <h5 className="grade">Name. <span>_____________________________</span></h5>
                <h5 className="paper">Roll#<span>_______________________________</span></h5>
                <h5 className="marks">{new Date().toLocaleString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                // hour: '2-digit',
                                                // minute: '2-digit'
                                                })
                                                }</h5>
            </div>
            <div className="details">
                <h5 className="grade">Section:<span>_____________________________</span></h5>
                <h5 className="marks">Composer:__________________________</h5>
                <h5 className="marks">Teacher Name.<span>____________________</span></h5>
            </div>
        </div>
            <div className="hr"></div>
        <div className="bubblesDiv">
                <p className='bubbles'>{state.map((value, index) => {
                    return(
                        <><div className="bubble" key={index}>
                            <b>{value}</b>
                            <span>A</span>
                            <span>B</span>
                            <span>C</span>
                            <span>D</span>
                        </div>
                        </>
                    )
                })}</p>
                <div className="breakRow"></div>
        </div>   
        {/* <McqsFormat />
        <ShortQest />
        <LongQuest /> */}
        <DataContainer selectedShortQuestions={selectedShortQuestions} selectedLongQuestions={selectedLongQuestions} dismiss={dismiss}/>
      </div>
    </div>
  )
}

export default PaperFormat
