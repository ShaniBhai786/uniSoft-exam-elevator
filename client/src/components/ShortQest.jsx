import React from 'react'
import { shortQuestions } from './physics/chapter1'

function ShortQest() {
  return (
    <div className='shortQuestFormat'>
      <table>
        <thead>
            <tr>
                <th>Q.2: Answer the following short questions:</th></tr> 
        </thead>
        <tbody>
            {
                shortQuestions.map((value, index) => {
                    return(
                        <tr key={index}>
                        <td><b>{value.id}</b>. {value.statement}</td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    </div>
  )
}

export default ShortQest
