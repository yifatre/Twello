import { useNavigate, useParams } from "react-router"
import { DescriptionEdit } from "./DescriptionEdit"
import { arrow_down, bars_icon, check_icon, checked_icon, clock_icon, cover_icon, eye_icon, label_icon, location_icon, member_icon, paperclip_icon, plus_icon, window_icon, x_icon } from "../UtilCmps/SVGs"
import { utilService } from "../../services/util.service"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { useOutletContext } from "react-router-dom"
import { useState } from "react"
import { ATTACHMENT, COVER, DATES, DynamicCmp, LABELS, MEMBERS } from "./DynamicCmps/DynamicCmp"



export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    const [board,onUpdateTask] = useOutletContext()
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const [actionType, setActionType] = useState(null)

    const [task, setTask] = useState(board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId))
    const navigate = useNavigate()
    console.log('boardId, groupId, taskId', boardId, groupId, taskId)
    function onAddMember() { }
    function onAddLabel() { }

    function closeTaskDetails() {
        navigate(`/board/${boardId}`) //! temporarily cancelled for dev
    }

    function onSetActionType(ev, type) {
        ev.preventDefault()
        ev.stopPropagation()
        setModalPosition(utilService.getModalPosition(ev.target))
        setActionType(type)
    }

    return <div className="task-details-backdrop">
        <ClickAwayListener onClickAway={closeTaskDetails}>
            <section className="task-details">
                <button className="details-close-btn" onClick={closeTaskDetails}>{x_icon}</button>
                <section className="cover">
                    <a href="#">{cover_icon}Cover</a>
                </section>
                <section className="title">
                    <span className="icon-span">{window_icon}</span>
                    <div className="title-txt">
                        <h2 hidden>{task.title}</h2>
                        <textarea name="title" id="title" value={task.title}></textarea>
                    </div>
                    <div className="list-txt">
                        <p>in list <a href="#">{'list name'}</a></p>
                        {eye_icon}
                    </div>
                    {/* {task.title} */}
                </section>
                <section className="data">
                    <div className="members">
                        <h3>Members</h3>
                        <div className="">
                            {task.memberIds?.map(memberId => <div key={memberId} className="avatar"></div>)}
                            <button className="avatar" onClick={onAddMember}>{plus_icon}</button>
                        </div>
                    </div>
                    <div className="labels">
                        <h3>Labels</h3>
                        <div className="">
                            {task.labelIds?.map(labelId => <div key={labelId} className="label">{labelId}</div>)}
                            <button className="label" onClick={onAddLabel}>{plus_icon}</button>
                        </div>
                    </div>
                    <div className="due-date">
                        <h3>Due date</h3>
                        <div className="">
                            <span className="box">
                                {check_icon}
                            </span>
                            <button>{utilService.getFormattedTime(new Date('April 25, 2024 20:20:00'))}{arrow_down}</button>
                        </div>

                    </div>
                    {/* <section className="notifications"></section> */}
                </section>
                <section className="description">
                    <span className="icon-span">{bars_icon}</span>
                    <h3>Description</h3>

                    <DescriptionEdit />
                </section>

                <section className="actions">
                    <h3>Add to card</h3>
                    <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, MEMBERS)} >{member_icon}Members</a>
                    <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, LABELS)}>{label_icon}Labels</a>
                    <a className="flex align-center" href="#" >{checked_icon}Checklist</a>
                    <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, DATES)}>{clock_icon}Dates</a>
                    <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, ATTACHMENT)}>{paperclip_icon}Attachment</a>
                    <a className="flex align-center" href="#">{location_icon}Location</a>
                    {!task.style?.backgroundColor && <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, COVER)}>{cover_icon}Cover</a>}
                    {actionType && <DynamicCmp groupId={groupId} cmp={actionType} task={task} position={modalPosition} info={board} onUpdateTasks={onUpdateTask} />}
                </section>
                {/* <ClickAwayListener onClickAway={() => setActionType(null)}> </ClickAwayListener>*/}
            </section>
        </ClickAwayListener>
    </div >
}