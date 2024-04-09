import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'

import { useState } from "react"
import { x_icon } from "../UtilCmps/SVGs"
import { boardService } from '../../services/board/board.service.local'

export function TaskAdd({ setIsAddMode, saveTask, groupId, type = 'TASK' }) {
    const [entity, setEntity] = useState(type === 'TASK' ? boardService.getEmptyTask() : boardService.getEmptyGroup())

    function handleChange({ target }) {
        setEntity(prevEntity => ({ ...prevEntity, title: target.value }))
    }

    function handleClickAway() {
        setIsAddMode(false)
    }

    function onSaveEntity(ev) {
        ev.preventDefault()
        saveTask(entity, groupId)
        setIsAddMode(false)
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form className="task-add-form" onSubmit={onSaveEntity}>
                <MinTextArea className='task-preview' onChange={handleChange} onKeyDown={(ev) => { if (ev.code === 'Enter') onSaveEntity(ev) }} name="title" id="title" placeholder="Enter a title for this card…"></MinTextArea>
                <div className='btn-actions-container'>
                    <button className='add-btn'>Add {type === 'TASK' ? 'card' : 'list'}</button>
                    <button className='flex align-center' type='button' onClick={() => setIsAddMode(false)}>{x_icon}</button>
                </div>
            </form>
        </ClickAwayListener>
    )
}