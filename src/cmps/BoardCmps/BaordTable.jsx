import { useParams } from "react-router";
import { AvatarList } from "../UtilCmps/AvatarList";
import { arrow_down, time_icon } from "../UtilCmps/SVGs";
import { BoardSideBar } from "./BoardSideBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoard } from "../../store/board/board.actions";

export function BoardTable() {
    const board = useSelector(storeState => storeState.boardModule.board)

    function getLabels(task) {
        return board.labels.filter(label => task.labelIds.includes(label.id))
    }

    function getMembers(task) {
        return board.members.filter(member => task.memberIds.includes(member._id))
    }

    function getDateFormat(task) {
        const date = new Date(task.date.dueDate)
        if (task.date.dueDate < Date.now()) return date.toString().slice(4, 7) + ' ' + date.getDate() + ', ' + date.getFullYear()
        return date.toString().slice(4, 7) + ' ' + date.getDate()
    }

    function getDateStatus(task) {
        const { dueDate } = task.date
        // if(task.dueDate.done) return 'done'
        if (dueDate < Date.now()) return 'over'
        else if (dueDate < Date.now() + (1000 * 60 * 60 * 24)) return 'soon'
        return ''
    }

    return (
        <>
            <header></header>
            <main className="board-table">
                <div className="table-head table-row">
                    <div>Card</div>
                    <div>list</div>
                    <div>Labels</div>
                    <div>Members</div>
                    <div className="date-th">Due date {arrow_down}</div>
                </div>
                <div className="table-content">
                    {board.groups.map(group =>
                        group.tasks.map(task =>
                            <div className="table-row cell">
                                <div className="task-title cell">
                                    <div className="table-img" style={{ backgroundImage: `url(${board.style.backgroundImage})`, backgroundColor: board.style.backgroundColor }}></div>
                                    {task.title}</div>
                                <div className="group-title cell">{group.title}</div>
                                {!!task.labelIds.length && <div className="board-labels cell">{getLabels(task).map(label =><div key={label.id} className={`label ${label.color || 'orange'}`}><span>{label.title}</span></div>)}</div>}
                                {!!task.memberIds?.length && <div className="table-preview-avatars cell"><AvatarList users={getMembers(task)} /></div>}
                                {!!task.date?.dueDate && <div className="table-date cell" id={getDateStatus(task)}><input type="checkbox"/><span>{time_icon}{getDateFormat(task)}</span></div>}
                            </div>
                        )
                    )}
                </div>
            </main>
        </>
    )
}
