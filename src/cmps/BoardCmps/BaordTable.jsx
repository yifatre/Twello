import { useNavigate, useParams } from "react-router";
import { AvatarList } from "../UtilCmps/AvatarList";
import { arrow_down, edit_icon, plus_icon, time_icon } from "../UtilCmps/SVGs";
import { BoardSideBar } from "./BoardSideBar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { loadBoard } from "../../store/board/board.actions";
import { boardService } from "../../services/board/board.service";
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { utilService } from "../../services/util.service";
import { DynamicCmp, LABELS, MEMBERS, DATES } from "../TaskCmps/DynamicCmps/DynamicCmp";


export function BoardTable({ saveGroup, removeGroup, saveTask, removeTask }) {
    const [newTask, setNewTask] = useState(boardService.getEmptyTask)
    const [isAdd, setIsAdd] = useState(false)
    const [actionType, setActionType] = useState(null)
    const board = useSelector(storeState => storeState.boardModule.board)
    const navigate = useNavigate()
    const refTrigger = useRef(null)

    function getLabels(task) {
        return board.labels.filter(label => task.labelIds.includes(label.id))
    }

    function getMembers(task) {
        return board.members.filter(member => task.memberIds.includes(member._id))
    }

    function getDateFormat(task) {
        const date = new Date(task.date.dueDate)
        if (date.getFullYear() !== new Date().getFullYear()) return date.toString().slice(4, 7) + ' ' + date.getDate() + ', ' + date.getFullYear()
        return date.toString().slice(4, 7) + ' ' + date.getDate()
    }

    function getDateStatus(task) {
        const { dueDate } = task.date
        // if(task.dueDate.done) return 'done'
        if (dueDate < Date.now()) return 'over'
        else if (dueDate < Date.now() + (1000 * 60 * 60 * 24)) return 'soon'
        return ''
    }

    function handleTitleChange({ target }) {
        setNewTask(prevTask => ({ ...prevTask, title: target.value }))
    }

    function onAddNewTask(group, taskIdx) {
        newTask.id = utilService.makeId('t')
        const _tasks = [...group.tasks]
        _tasks.splice(taskIdx + 1, 0, newTask)
        saveGroup({ ...group, tasks: _tasks })
        setIsAdd(false)
    }

    function onSetActionType(ev, type, groupId, task) {
        ev.preventDefault()
        ev.stopPropagation()
        refTrigger.current = ev.target.parentElement.parentElement.parentElement.parentElement
        setActionType({ type, groupId, task })
    }

    return (
        <>
            <main className="board-table">
                <div className="table-head table-row">
                    <div>Card</div>
                    <div>List</div>
                    <div>Labels</div>
                    <div>Members</div>
                    <div className="date-th">Due date {arrow_down}</div>
                </div>
                <div className="table-content">

                    {board.groups.map((group, groupIdx) =>

                        group.tasks.map((task, taskIdx) =>
                            <>
                                <div className="table-row" >
                                    <div className="task-title cell" onClick={() => navigate(`/board/${board._id}/${group.id}/${task.id}`)}>
                                        {/* <div className="table-img" style={{ backgroundImage: `url(${board.style.backgroundImage})`, backgroundColor: board.style.backgroundColor }}></div> */}
                                        {task.title}
                                        <button className="title-edit-btn">{edit_icon}</button>
                                        <span className="td-fade"></span>
                                    </div>
                                    <div className="group-title cell">{group.title}<span className="td-fade"></span><button className="arrow-down">{arrow_down}</button></div>

                                    <div className="cell">
                                        {!task.labelIds?.length && <div className="cell"><span className="dot">·</span><button className="plus-btn" onClick={(ev) => onSetActionType(ev, LABELS, group.id, task)}>{plus_icon}</button></div>}
                                        {!!task.labelIds.length && <div className="board-labels cell">{getLabels(task).map(label => <div key={label.id} className={`label ${label.color || 'orange'}`}><span>{label.title}</span></div>)}<span className="td-fade"></span><button className="arrow-down" onClick={(ev) => onSetActionType(ev, LABELS, group.id, task)}>{arrow_down}</button></div>}
                                    </div>
                                    <div className="cell">
                                        {!task.memberIds?.length && <div className="cell"><span className="dot">·</span><button className="plus-btn" onClick={(ev) => onSetActionType(ev, MEMBERS, group.id, task)}>{plus_icon}</button></div>}
                                        {!!task.memberIds?.length && <div className="table-preview-avatars cell"><AvatarList users={getMembers(task)} /><span className="td-fade"></span><button className="arrow-down" onClick={(ev) => onSetActionType(ev, MEMBERS, group.id, task)}>{arrow_down}</button></div>}
                                    </div>
                                    <div className="cell">
                                        {!task.date?.dueDate && <div className="cell"><span className="dot">·</span><button className="plus-btn" onClick={(ev) => onSetActionType(ev, DATES, group.id, task)}>{plus_icon}</button></div>}
                                        {!!task.date?.dueDate && <div className="table-date cell" ><input type="checkbox" /><div id={getDateStatus(task)}><span>{time_icon}{getDateFormat(task)}</span><span className="td-fade"></span></div><button className="arrow-down" onClick={(ev) => onSetActionType(ev, DATES, group.id, task)}>{arrow_down}</button></div>}
                                    </div>
                                    <div className="cell-sep"><button className="inline-add" onClick={() => setIsAdd({ groupIdx, taskIdx })}>{plus_icon}</button><hr className="sep-hr " /></div>

                                </div>

                                {(isAdd && isAdd.groupIdx === groupIdx && isAdd.taskIdx === taskIdx) &&
                                    <ClickAwayListener onClickAway={() => setIsAdd(false)}>
                                        <div className="tt-add table-row">
                                            <input type="text" className="title-input" placeholder="Add new card..." autoFocus onChange={handleTitleChange} onKeyDown={(ev) => { if (ev.key === 'Enter') onAddNewTask(group, taskIdx) }} />
                                            <div className="group-title cell">{group.title}<span className="td-fade"></span><button className="arrow-down">{arrow_down}</button></div>
                                        </div>
                                    </ClickAwayListener>
                                }
                            </>
                        )

                    )}

                    <button className="add-card-btn">{plus_icon}Add</button>
                </div>
                {(actionType && refTrigger.current !== null) && <ClickAwayListener onClickAway={() => { setActionType(null); refTrigger.current = null }}>
                    <div>
                        <DynamicCmp setActionType={setActionType} groupId={actionType.groupId} cmp={{ type: actionType.type }} task={actionType.task} board={board} saveTask={saveTask} refTrigger={refTrigger} offset={{ x: 0, y: refTrigger.current.getBoundingClientRect().height +0.5 }} />
                    </div>
                </ClickAwayListener>}
            </main >
        </>
    )
}
