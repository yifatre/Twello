import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'

import { useEffect, useRef, useState } from "react"
import { x_icon } from "../UtilCmps/SVGs"
import { boardService } from '../../services/board/board.service.local'

export function DynEntityAdd({ setIsAddMode, saveEntity, groupId, type = 'TASK' }) {
    const [entity, setEntity] = useState(type === 'TASK' ? boardService.getEmptyTask() : boardService.getEmptyGroup())
    const formRef = useRef(null)

    useEffect(() => {
        formRef.current.scrollIntoView({inline: "center", behavior: "smooth"})
    }, [])

    function handleChange({ target }) {
        setEntity(prevEntity => ({ ...prevEntity, title: target.value }))
    }

    function handleClickAway() {
        setIsAddMode(false)
    }

    async function onSaveEntity(ev) {
        ev.preventDefault()
        if (!entity.title.trim().length) return setIsAddMode(false)

        try {
            await saveEntity(entity, groupId)
            setEntity(type === 'TASK' ? boardService.getEmptyTask() : boardService.getEmptyGroup())
            ev.target.scrollIntoView({inline: "center", behavior: "smooth"})
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form className="dyn-entity-add-form" onSubmit={onSaveEntity} ref={formRef}>

                <MinTextArea
                    className='entity-preview'
                    value={entity.title}
                    onChange={handleChange}
                    onKeyDown={(ev) => { if (ev.code === 'Enter') onSaveEntity(ev) }}
                    id="title"
                    placeholder={type === 'TASK' ? 'Enter a title for this card…' : 'Enter list title...'} autoFocus>
                </MinTextArea>

                <div className='btn-actions-container'>
                    <button id='add-btn'>Add {type === 'TASK' ? 'card' : 'list'}</button>
                    <button className='x-btn' type='button' onClick={() => setIsAddMode(false)}>{x_icon}</button>
                </div>

            </form>
        </ClickAwayListener>
    )
}