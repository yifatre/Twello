import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'

import { useState } from "react"
import { x_icon } from "../UtilCmps/SVGs"
import { boardService } from '../../services/board/board.service.local'

export function TaskAdd({ setIsAddMode, saveTask, groupId }) {
    const [task, setTask] = useState(boardService.getEmptyTask())

    function handleChange({ target }) {
        setTask(prevTask => ({ ...prevTask, title: target.value }))
    }

    function handleClickAway() {
        setIsAddMode(false)
    }

    function onSaveTask(ev) {
        ev.preventDefault()
        saveTask(task, groupId)
        setIsAddMode(false)
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form className="task-add-form" onSubmit={onSaveTask}>
                <MinTextArea className='task-preview' onChange={handleChange} onKeyDown={(ev) => { if (ev.code === 'Enter') onSaveTask(ev) }} name="title" id="title" placeholder="Enter a title for this card…"></MinTextArea>
                <div className='btn-actions-container'>
                    <button className='add-btn'>Add card</button>
                    <button className='flex align-center' type='button' onClick={() => setIsAddMode(false)}>{x_icon}</button>
                </div>
            </form>
        </ClickAwayListener>
    )
}