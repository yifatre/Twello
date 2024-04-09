import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'

import { useEffect, useRef, useState } from "react"
import { x_icon } from "../UtilCmps/SVGs"
import { boardService } from '../../services/board/board.service.local'

export function TaskAdd({ setIsAddMode, saveTask, groupId }) {
    const [task, setTask] = useState(boardService.getEmptyTask())
    const formRef = useRef(null)

    useEffect(() => {
        formRef.current.scrollIntoView(true)
    }, [])

    function handleChange({ target }) {
        setTask(prevTask => ({ ...prevTask, title: target.value }))
    }

    function handleClickAway() {
        setIsAddMode(false)
    }

    async function onSaveTask(ev) {
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
            <form className="task-add-form" onSubmit={onSaveTask} ref={formRef}>
                <MinTextArea className='task-preview' value={task.title} onChange={handleChange} onKeyDown={(ev) => { if (ev.code === 'Enter') onSaveTask(ev) }} name="title" id="title" placeholder="Enter a title for this card…" autoFocus></MinTextArea>
                <div className='btn-actions-container'>
                    <button id='add-btn'>Add card</button>
                    <button className='flex align-center' type='button' onClick={() => setIsAddMode(false)}>{x_icon}</button>
                </div>
            </form>
        </ClickAwayListener>
    )
}