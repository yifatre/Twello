import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'

import { useEffect, useRef, useState } from "react"
import { x_icon } from "../UtilCmps/SVGs"
import { boardService } from '../../services/board/board.service.local'

export function TaskAdd({ setIsAddMode, saveTask, groupId, type = 'TASK' }) {
    const [entity, setEntity] = useState(type === 'TASK' ? boardService.getEmptyTask() : boardService.getEmptyGroup())
    const formRef = useRef(null)

    useEffect(() => {
        formRef.current.scrollIntoView(true)
    }, [])

    function handleChange({ target }) {
        setEntity(prevEntity => ({ ...prevEntity, title: target.value }))
    }

    function handleClickAway() {
        setIsAddMode(false)
    }

    async function onSaveEntity(ev) {
        ev.preventDefault()
        if (!task.title.trim().length) return setIsAddMode(false)
        
        try {
            await saveTask(task, groupId)
            setTask(boardService.getEmptyTask())
            ev.target.scrollIntoView(true);
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form className="task-add-form" onSubmit={onSaveEntity} ref={formRef}>
                <MinTextArea className='task-preview' value={task.title} onChange={handleChange} onKeyDown={(ev) => { if (ev.code === 'Enter') onSaveEntity(ev) }} name="title" id="title" placeholder="Enter a title for this card…" autoFocus></MinTextArea>
                <div className='btn-actions-container'>
                    <button id='add-btn'>Add {type === 'TASK' ? 'card' : 'list'}</button>
                    <button className='flex align-center' type='button' onClick={() => setIsAddMode(false)}>{x_icon}</button>
                </div>
            </form>
        </ClickAwayListener>
    )
}