import React from 'react'

function ToolsBar({handleBubbleChange, handleQuantity, bubbles}) {
  return (
    <div className='toolsBar'>
      <div className="paper_tools">
        <select name="bubble" id="bubble" onChange={handleBubbleChange}>
            <option value="">Choose Bubbles</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
        </select>
        {bubbles === true && <select name="quantity" id="quantity" onChange={handleQuantity}>
            <option value="">Choose Bubbles</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
        </select>  }
      </div>
        <div className="buttons">
            <button>Question Menu</button>
            <button>Edit</button>
            <button>Save</button>
            <button>Delete</button>
            <button>Print</button>
        </div>
    </div>
  )
}

export default ToolsBar
