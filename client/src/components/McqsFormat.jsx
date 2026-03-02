import React, { useState } from 'react'
import { mcqs } from './physics/chapter1'
import Mcqs from './Mcqs'

function McqsFormat() {

  const [selected, setSelected] = useState([])

  const handleChange = (mcq) => {
    setSelected((prev) => prev.some(item => item.id === mcq.id) ?
    prev.filter(item => item.id !== mcq.id): 
    [...prev, mcq]
    )
  }

  const addQuestion = () => {
    console.log(selected)
  }

  return (
    <div className='mcqsContainer'>
      <table className='mcqsTable'>
        <thead>
          <tr>
            <th className='select'>Select</th>
            <th>Choose the correct option</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
          </tr>
        </thead>

        <tbody>
          {mcqs.map((value) => (
            <tr key={value.id} className='row'>
              <td className='select'>
                <input
                  type="checkbox"
                  checked={selected.some(item => item.id === value.id)}
                  onChange={() => handleChange(value)}
                />
              </td>

              <td className='statement'>
                <strong>{value.id} - {value.statement}</strong>
              </td>

              <td>{value.optionA}</td>
              <td>{value.optionB}</td>
              <td>{value.optionC}</td>
              <td>{value.optionD}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button onClick={() => setSelected(mcqs)}>
          Select All
        </button>

        <button onClick={() => setSelected([])}>
          Deselect All
        </button>

        <button onClick={addQuestion}>
          Add Questions
        </button>
      </div>

      <Mcqs selected={selected} />
    </div>
  )
}

export default McqsFormat
