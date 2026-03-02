import React, { useState } from 'react'
import ToolsBar from './ToolsBar'
import PaperFormat from './PaperFormat'
import Menu from './Menu'

function Test() {
    const [bubbles, setBubbles] = useState(false)
    const [noOFbubbles, setNoOFBubbles] = useState()
    const [state, setState] = useState([])

    const handleBubbleChange = (e) => {
        setBubbles(e.target.value ==="yes")
    }
    const handleQuantity = (e) => {
        const maxValue = Number(e.target.value)
        setNoOFBubbles(maxValue)

        const bubbleArray = []

        for (let index = 0; index < maxValue; index++) {
            bubbleArray.push(index+1)
        }
        setState(bubbleArray)
    }
  return (
    <div className='Testcontainer'>
        <ToolsBar handleBubbleChange={handleBubbleChange} handleQuantity={handleQuantity} bubbles={bubbles}  />
            <div className="innerContent">
            <PaperFormat state={state} />
            <Menu />
        </div>
    </div>
  )
}

export default Test
