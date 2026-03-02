import React from 'react'
import { longQuestions } from './physics/chapter1'

function LongQuest() {
  return (
    <div className='longQuestFormat'>
      <table>
        <thead>
            <tr>
                <th>Q.3: Answer the following questions in deatil:</th></tr> 
        </thead>
        <tbody>
            {
                longQuestions.map((value, index) => {
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

export default LongQuest
