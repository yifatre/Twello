import { useNavigate, useParams } from "react-router"
import { DescriptionEdit } from "./DescriptionEdit"
import { arrow_down, bars_icon, check_icon, checked_icon, clock_icon, cover_icon, eye_icon, label_icon, location_icon, member_icon, paperclip_icon, plus_icon, window_icon, x_icon } from "../UtilCmps/SVGs"
import { utilService } from "../../services/util.service"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { ATTACHMENT, COVER, DATES, DynamicCmp, LABELS, MEMBERS } from "./DynamicCmps/DynamicCmp"
import { useSelector } from "react-redux"
import { AvatarPreview } from "../UtilCmps/AvatarPreview"
import { ChecklistIndex } from "./CheckList.jsx/ChecklistIndex"



export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    const [saveTask] = useOutletContext()
    const board = useSelector(storeState => storeState.boardModule.board)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const [actionType, setActionType] = useState(null)
    const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)

    const [task, setTask] = useState(board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId))
    const [titleToEdit, setTitleToEdit] = useState(task.title)
    const navigate = useNavigate()

    useEffect(() => {
        setTask(board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId))
    }, [board])

    useEffect(() => {
        saveTask({ ...task, title: titleToEdit }, groupId)
    }, [titleToEdit])

    function onEditDescription(ev) {
        ev.preventDefault()
        setIsDescriptionEdit(true)
    }

    function closeTaskDetails() {
        navigate(`/board/${boardId}`)
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setTitleToEdit(value)
    }

    function onOpenModalFromList(ev, type) {
        ev.preventDefault()
        ev.stopPropagation()
        onSetActionType(ev, type, 0, ev.currentTarget.getBoundingClientRect().height + 8)
    }

    function onSetActionType(ev, type, offsetx = 0, offsety = 0) {
        ev.preventDefault()
        ev.stopPropagation()
        setModalPosition(utilService.getModalPosition(ev.currentTarget, offsetx, offsety))
        setActionType(type)
    }

    return <div className="task-details-backdrop">
        <ClickAwayListener onClickAway={closeTaskDetails}>
            <section className="task-details">
                <button className="details-close-btn" onClick={closeTaskDetails}>{x_icon}</button>
                {(task.style?.backgroundColor || task.style?.backgroundImage) && <section className="cover">
                    <a href="#">{cover_icon}Cover</a>
                </section>}
                <section className="title">
                    <span className="icon-span">{window_icon}</span>
                    <div className="title-txt">
                        <h2 hidden>{task.title}</h2>
                        <textarea name="title" id="title" value={titleToEdit} onChange={handleChange}></textarea>
                    </div>
                    <div className="list-txt">
                        <p>in list <a href="#">{'list name'}</a></p>
                        {eye_icon}
                    </div>
                </section>
                <section className="data">
                    {!!task.memberIds.length && <div className="members">
                        <h3>Members</h3>
                        <div className="">
                            {task.memberIds?.map(memberId => <div key={memberId} className="avatar" > <AvatarPreview user={board.members.find(_member => _member._id === memberId)} /> </div>)}
                            <button className="avatar neutral-label" onClick={(ev) => onOpenModalFromList(ev, MEMBERS)}>{plus_icon}</button>
                        </div>
                    </div>}
                    {!!task.labelIds.length && <div className="labels">
                        <h3>Labels</h3>
                        <div className="">
                            {task.labelIds?.map(labelId => <div key={labelId} className={`label ${board.labels.find(label => label.id === labelId).color}`}>{board.labels.find(label => label.id === labelId).title}</div>)}
                            <button className="label neutral-label" onClick={(ev) => onOpenModalFromList(ev, LABELS)}>{plus_icon}</button>
                        </div>
                    </div>}
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
                    <div className="task-description">
                        {!isDescriptionEdit && <a href="#" className="" onClick={onEditDescription}><div dangerouslySetInnerHTML={{ __html: (task.description || 'Add a more detailed description...') }}></div></a>}
                        {isDescriptionEdit && <div className="desc-editor"><DescriptionEdit groupId={groupId} task={task} saveTask={saveTask} setIsDescriptionEdit={setIsDescriptionEdit} /></div>}
                    </div>
                </section>

                <section className="checklists">
                <ChecklistIndex task={task} saveTask={saveTask} groupId={groupId}/>
                </section>

                <section className="actions">
                    <h3>Add to card</h3>
                    <a className="flex align-center" href="#" onClickCapture={(ev) => onSetActionType(ev, MEMBERS)} >{member_icon}Members</a>
                    <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, LABELS)}>{label_icon}Labels</a>
                    <a className="flex align-center" href="#" >{checked_icon}Checklist</a>
                    <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, DATES)}>{clock_icon}Dates</a>
                    <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, ATTACHMENT)}>{paperclip_icon}Attachment</a>
                    <a className="flex align-center" href="#">{location_icon}Location</a>
                    {!(task.style?.backgroundColor || task.style?.backgroundImage) && <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, COVER)}>{cover_icon}Cover</a>}
                    <ClickAwayListener onClickAway={() => setActionType(null)}>
                        <div>
                            {actionType && <DynamicCmp setActionType={setActionType} groupId={groupId} cmp={actionType} task={task} position={modalPosition} board={board} saveTask={saveTask} />}
                        </div>
                    </ClickAwayListener>
                </section>
            </section>
        </ClickAwayListener>
    </div >
}