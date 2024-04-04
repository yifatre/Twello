import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize';

import { useState } from "react"
import { x_icon } from "../UtilCmps/SVGs"

export function TaskAdd({setIsAddMode}) {
    const [task, setTask] = useState(null)

    function handleChange({ target }) {
        setTask(target.title)
    }

    function handleClickAway() {
        setIsAddMode(false)
    }

    function saveTask(ev){
        ev.preventDefault()
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
        
            <form className="task-add-form" onSubmit={saveTask}>
                <MinTextArea className='task-preview' onChange={handleChange} contenteditable="true" name="title" id="title" placeholder="Enter a title for this card…"></MinTextArea>
                <div className='btn-actions-container'>
                    <button className='add-btn'>Add card</button>
                    <button className='flex align-center'>{x_icon}</button>
                </div>
            </form>
        </ClickAwayListener>
    )
}