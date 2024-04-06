import { bars_icon, checked_icon, edit_icon, eye_icon, paperclip_icon, time_icon } from "../UtilCmps/SVGs"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useNavigate, useParams } from "react-router-dom"

export function TaskPreview({ task, id, activeId, groupId }) {
    console.log(id);    const { boardId } = useParams()
    const navigate = useNavigate()

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

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id })

    const tran = {transform: CSS.Transform.toString(transform)}

    if ( activeId === id) tran.transform += 'rotate(+0.01turn)'

    const { title, style } = task
    return (
        <li className="task-preview" onClick={() => navigate(`/board/${boardId}/${groupId}/${task.id}`)}
            style={{
                backgroundColor: style?.backgroundColor || '#ffffff',
                backgroundImage: `url(${style?.backgroundImage})`,
                transform: tran.transform
            }}
            // style={style}
            ref={setNodeRef} {...attributes} {...listeners} id={id}
            >
            <i className="edit-icon">{edit_icon}</i>
            <a>{title}</a>
            <div className="task-info">
                <span className="icon-container">{eye_icon}</span>
                {!!task.dueDate && <div className="txt-and-icon icon-container">{time_icon}{getDateFormat()}</div>}
                {!!task.description && <span className="icon-container">{bars_icon}</span>}
                <div className="txt-and-icon icon-container">{paperclip_icon}2</div>
                {!!task.checklists?.length
                    && <div className="txt-and-icon icon-container">{checked_icon}{`${getTodoDoneCount().doneCount}/${getTodoDoneCount().totalTodos}`}</div>}

            </div>
        </li>
    )
}