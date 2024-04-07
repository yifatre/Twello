import { bars_icon, checked_icon, edit_icon, eye_icon, paperclip_icon, time_icon } from "../UtilCmps/SVGs"
import { AvatarList } from "../UtilCmps/AvatarList"

export function TaskPreview({ task, saveTask, removeTask, board }) {

    function getTodoDoneCount() {
        if (!task.checklists) return
        let doneCount = 0
        let totalTodos = 0

        task.checklists.forEach((checklist) => {
            totalTodos += checklist.todos.length
            checklist.todos.forEach((todo) => {
                if (todo.isDone) return doneCount++
            })
        })
        return { doneCount, totalTodos }
    }

    function getDateFormat() {
        const date = new Date(task.dueDate)
        return date.toString().slice(4, 7) + ' ' + date.getDate()
    }

    function getLabels() {
        return board.labels.filter(label => task.labelIds.includes(label.id))
    }

    function getMembers() {
        return board.members.filter(member => task.memberIds.includes(member.id))
    }

    const { title, style } = task
    return (
      <>
            {task.style?.backgroundImage && <img src={task.style.backgroundImage}/>}
            <div className="content">
                {task.labelIds &&
                    <div className='labels'>
                        {getLabels().map(label => <div key={label.id} className={`label ${label.color || 'orange'}`} >{label.title}</div>)}
                    </div>}

                <i className="edit-icon">{edit_icon}</i>
                <a>{title}</a>
                <div className="task-info-container">
                    <div className="task-info">
                        <span className="icon-container">{eye_icon}</span>
                        {!!task.dueDate && <div className="txt-and-icon icon-container">{time_icon}{getDateFormat()}</div>}
                        {!!task.description && <span className="icon-container">{bars_icon}</span>}
                        <div className="txt-and-icon icon-container">{paperclip_icon}2</div>
                        {!!task.checklists?.length
                            && <div className="txt-and-icon icon-container">{checked_icon}{`${getTodoDoneCount().doneCount}/${getTodoDoneCount().totalTodos}`}</div>}
                    </div>
                    {task.memberIds && <div className="task-preview-avatars"><AvatarList users={getMembers()} /></div>}

                </div>
            </div>
        </>
    )
}