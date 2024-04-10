import { bars_icon, checked_icon, edit_icon, eye_icon, paperclip_icon, time_icon } from "../UtilCmps/SVGs"
import { useNavigate, useParams } from "react-router-dom"
import { AvatarList } from "../UtilCmps/AvatarList"
import { useState } from "react"

export function TaskPreview({ task, groupId, removeTask, board, isLabelsExtended, setIsLabelExtended }) {
    const navigate = useNavigate()
    const [todosCount, setTodosCount] = useState(getTodoDoneCount())
    console.log(todosCount);

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
        if(task.date.dueDate < Date.now()) return date.toString().slice(4, 7) + ' ' + date.getDate() + ', ' + date.getFullYear()
        return date.toString().slice(4, 7) + ' ' + date.getDate()
    }

    function getDateStatus() {
        const { dueDate } = task.date
        // if(task.dueDate.done) return 'done'
        if (dueDate < Date.now()) return 'over'
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

    const { title, style } = task
    return (
        <div className="task-preview" onClick={() => navigate(`/board/${board._id}/${groupId}/${task.id}`)}
            style={{
                backgroundColor: style?.backgroundColor || '#ffffff',
            }}

        >
            {task.style?.backgroundImage && <div className="img-container"> <img src={task.style.backgroundImage} /></div>}
            <div className="content">
                {!!task.labelIds.length &&
                    <div className='labels'>
                        {getLabels().map(label => <div key={label.id} onClick={toggleExtendedLabels} className={`label ${!isLabelsExtended ? 'collapsed' : ''} ${label.color || 'orange'}`}><span>{isLabelsExtended ? label.title : label.title}</span></div>)}
                    </div>}

                <i className="edit-icon">{edit_icon}</i>
                <h4 className="task-preview-title">{title}</h4>
                <div className="task-info-container">
                    <div className="task-info">
                        {/* <span className="icon-container">{eye_icon}</span> */}
                        {!!task.date?.dueDate && <div className="txt-and-icon icon-container date-preview" id={getDateStatus()}>{time_icon}{getDateFormat()}</div>}
                        {!!task.description && <span className="icon-container">{bars_icon}</span>}
                        {!!task.attachments && <div className="txt-and-icon icon-container">{paperclip_icon}{task.attachments.length}</div>}
                        {!!task.checklists?.length
                            && <div className={`txt-and-icon icon-container`} id={todosCount.done === todosCount.total ? 'done' : ''}>{checked_icon}{`${todosCount.done}/${todosCount.total}`}</div>}
                    </div>
                    {!!task.memberIds?.length && <div className="task-preview-avatars"><AvatarList users={getMembers()} /></div>}

                </div>
            </div>
        </div>
    )
}