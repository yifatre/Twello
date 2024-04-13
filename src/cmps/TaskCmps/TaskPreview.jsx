import { bars_icon, checked_icon, edit_icon, eye_icon, paperclip_icon, time_icon } from "../UtilCmps/SVGs"
import { AvatarList } from "../UtilCmps/AvatarList"
import { useRef, useState } from "react"
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'
import { boardService } from "../../services/board/board.service.local"

export function TaskPreview({ task, groupId, removeTask, board, isLabelsExtended, setIsLabelExtended, setTaskQuickEdit, saveTask, refTrigger }) {
    const [titleToEdit, setTitleToEdit] = useState(task.title)
    const [todosCount, setTodosCount] = useState(getTodoDoneCount())
    const refTemp = useRef(null)

    function getTodoDoneCount() {
        if (!task.checklists) return
        const _todosCount = { done: 0, total: 0 }

        task.checklists.forEach((checklist) => {
            _todosCount.total += checklist.todos.length
            checklist.todos.forEach((todo) => {
                if (todo.isDone) return _todosCount.done++
            })
        })
        return _todosCount
    }

    function getDateFormat() {
        const date = new Date(task.date.dueDate)
        if (task.date.dueDate < Date.now()) return date.toString().slice(4, 7) + ' ' + date.getDate() + ', ' + date.getFullYear()
        return date.toString().slice(4, 7) + ' ' + date.getDate()
    }

    function getDateStatus() {
        const { dueDate } = task.date
        if (task.date.isDone) return 'done'
        else if (dueDate < Date.now()) return 'over'
        else if (dueDate < Date.now() + (1000 * 60 * 60 * 24)) return 'soon'
        return ''
    }

    function getLabels() {
        return board.labels.filter(label => task.labelIds.includes(label.id))
    }

    function toggleExtendedLabels(ev) {
        ev.stopPropagation()
        setIsLabelExtended(!isLabelsExtended)
    }

    function getMembers() {
        return board.members.filter(member => task.memberIds.includes(member._id))
    }

    function handleTitleChange({ target }) {
        setTitleToEdit(target.value)
    }

    function onUpdateTitle() {
        saveTask({ ...task, title: titleToEdit }, groupId)
        setTaskQuickEdit(null)
    }

    function onOpenQuickEdit(ev) {
        ev.stopPropagation()
        refTrigger.current = refTemp.current
        setTaskQuickEdit(task)
    }

    function onUpdateDate(ev) {
        ev.stopPropagation()
        let activity = boardService.getActivity(`mark the due date on ${task.title} ${task.date?.isDone?'incomplete':'complete'}`, 0,board.groups.find(group => group.id === groupId),task)
        saveTask({...task, date:{...task.date, isDone: !task.date.isDone}}, groupId,activity)
    }

    const { title, style } = task
    return (
        <><div className="task-preview"
            style={{
                backgroundColor: '#ffffff',
            }}
            ref={refTemp}
        >
            {(style?.backgroundImage || style?.backgroundColor) && <div className="img-container" style={{backgroundColor: style.backgroundColor}}> <img src={task.style.backgroundImage} /></div>}
            <div className="content">
                {!!task.labelIds?.length &&
                    <div className='labels'>
                        {getLabels().map(label => <div key={label.id} onClick={toggleExtendedLabels} className={`label ${!isLabelsExtended ? 'collapsed' : ''} ${label.color || 'orange'}`}><span>{isLabelsExtended ? label.title : label.title}</span></div>)}
                    </div>}

                <i className="edit-icon" onClick={onOpenQuickEdit}>{edit_icon}</i>
                <h4 className="task-preview-title">{title}</h4>
                <MinTextArea className="task-preview-title edit" value={titleToEdit} autoFocus={true} onFocus={(ev) => ev.target.select()} onChange={handleTitleChange} onKeyDown={(ev) => { if (ev.code === 'Enter') handleClickAway() }} ></MinTextArea>
                <div className="task-info-container">
                    <div className="task-info">
                        {/* <span className="icon-container">{eye_icon}</span> */}

                        {!!task.date?.dueDate &&
                            <div className="txt-and-icon icon-container date-preview"
                                onClick={onUpdateDate}
                                id={getDateStatus()}>
                                {task.date.isDone ? <span className="date-check-i">{checked_icon}</span> : <span className="date-check-i box"></span>}<span className="clock-icon">{time_icon}</span>{getDateFormat()}
                            </div>}

                        {!!task.description && <span className="icon-container">{bars_icon}</span>}
                        {!!task.attachments && <div className="txt-and-icon icon-container">{paperclip_icon}{task.attachments.length}</div>}
                        {!!task.checklists?.length && <div className={`txt-and-icon icon-container`}
                            id={todosCount.done === todosCount.total ? 'done' : ''} >
                            {checked_icon}{`${todosCount.done}/${todosCount.total}`}
                        </div>}
                    </div>
                    {!!task.memberIds?.length && <div className="task-preview-avatars"><AvatarList users={getMembers()} /></div>}

                </div>
            </div>
        </div>
            <button className="qe-save-btn" onClick={onUpdateTitle}>Save</button></>
    )
}