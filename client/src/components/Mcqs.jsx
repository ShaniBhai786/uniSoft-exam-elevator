import React from 'react'

function Mcqs({selected}) {
  return (
    <>
      <table>
        <thead>
            <tr>
                <th>Sr#</th>
                <th>Statement</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
            </tr>
        </thead>
        <tbody>
            {selected.map((value, index) => {
                return(
                    <tr key={index}>
                        <td>{value.id}</td>
                        <td>{value.statement}</td>
                        <td>{value.optionA}</td>
                        <td>{value.optionB}</td>
                        <td>{value.optionC}</td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </>
  )
}

export default Mcqs
