import { useNavigate, useParams } from "react-router"
import { DescriptionEdit } from "./DescriptionEdit"
import { activity_icon, arrow_down, bars_icon, check_icon, checked_icon, clock_icon, cover_icon, eye_icon, label_icon, location_icon, member_icon, paperclip_icon, plus_icon, right_up_arrow, window_icon, x_icon } from "../UtilCmps/SVGs"
import { utilService } from "../../services/util.service"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { useOutletContext } from "react-router-dom"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ATTACHMENT, CHECKLIST, COVER, DATES, DynamicCmp, LABELS, MEMBERS } from "./DynamicCmps/DynamicCmp"
import { useSelector } from "react-redux"
import { AvatarPreview } from "../UtilCmps/AvatarPreview"
import { ChecklistIndex } from "./CheckList/ChecklistIndex"
import { boardService } from "../../services/board/board.service.local"
import { FastAverageColor } from 'fast-average-color'
import { Activity } from "../BoardCmps/Activity"

export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    const [saveTask] = useOutletContext()
    const board = useSelector(storeState => storeState.boardModule.board)
    const [actionType, setActionType] = useState(null)
    const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
    const [coverColor, setCoverColor] = useState(false)

    const [task, setTask] = useState(board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId))
    const [titleToEdit, setTitleToEdit] = useState(task.title)
    const navigate = useNavigate()
    const fac = new FastAverageColor()

    const refTrigger = useRef(null)

    useEffect(() => {
        setTask(board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId))
    }, [board])

    useEffect(() => {
        saveTask({ ...task, title: titleToEdit }, groupId)
    }, [titleToEdit])

    // useEffect(() => {
    //      async () => {
    //         try {
    //             const color = await fac.getColorAsync(task.type.backgroundImage)
    //             console.log(color);
    //             setCoverColor(color.rgba)
    //         }
    //         catch (err) {
    //             console.error(err)
    //         }
    //     }
    // }, [])

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

    function onSetActionType(ev, type) {
        ev.preventDefault()
        ev.stopPropagation()
        refTrigger.current = ev.currentTarget
        setActionType(type)
    }

    function onCheckDate() {
        let activity = boardService.getActivity(`mark the due date on ${task.title} ${task.date?.isDone ? 'incomplete' : 'complete'}`, 0, board.groups.find(group => group.id === groupId), task)
        saveTask({ ...task, date: { ...task.date, isDone: !task.date?.isDone } }, groupId, activity)
    }

    const due = task.date?.isDone ? 'Complete' : task.date?.dueDate - Date.now() < 0 ? 'Overdue' : task.date?.dueDate - Date.now() <= 24 * 60 * 60 * 1000 ? 'Due soon' : ''
    return <div className="task-details-container">

        <section className="task-details-backdrop">
            <ClickAwayListener onClickAway={closeTaskDetails}>
                <section className="task-details">
                    <button className="details-close-btn" onClick={closeTaskDetails}>{x_icon}</button>
                    {(task.style?.backgroundColor || task.style?.backgroundImage) && <section className={`cover ${task.style.backgroundColor}`}>
                        <img src={task.style.backgroundImage} className="cover-img" alt="" />
                        <a href="#" onClick={(ev) => onSetActionType(ev, COVER)}>{cover_icon}Cover</a>
                    </section>}
                    <span className="icon-span title-icon">{window_icon}</span>
                    <section className="title">
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
                                <button className="avatar neutral-label" onClick={(ev) => onSetActionType(ev, MEMBERS)}>{plus_icon}</button>
                            </div>
                        </div>}
                        {!!task.labelIds.length && <div className="labels">
                            <h3>Labels</h3>
                            <div className="">
                                {task.labelIds?.map(labelId => <div key={labelId} className={`label ${board.labels.find(label => label.id === labelId).color}`}>{board.labels.find(label => label.id === labelId).title}</div>)}
                                <button className="label neutral-label" onClick={(ev) => onSetActionType(ev, LABELS)}>{plus_icon}</button>
                            </div>
                        </div>}
                        {task.date?.dueDate && <div className="due-date">
                            <h3>Due date</h3>
                            <div className="">
                                <span className="box" onClick={() => onCheckDate()}>
                                    {task.date?.isDone && check_icon}
                                </span>

                                <button onClick={(ev) => onSetActionType(ev, DATES)} className="tasks-btn">{utilService.getFormattedTime(new Date(task.date.dueDate))}<span className={`due ${due === 'Due soon' ? 'soon' : due === 'Overdue' ? 'over' : due === 'Complete' ? 'done' : ''}`}>{due}</span>{arrow_down}</button>
                            </div>
                        </div>}
                        {/* <section className="notifications"></section> */}
                    </section>
                    <span className="icon-span desc-icon">{bars_icon}</span>
                    <section className="description">
                        <h3>Description</h3>
                        <div className="task-description">
                            {!isDescriptionEdit && <div className={`desc-content ${task.description ? '' : 'empty'}`} onClick={onEditDescription} dangerouslySetInnerHTML={{ __html: (task.description || 'Add a more detailed description...') }}></div>}
                            {isDescriptionEdit && <div className="desc-editor"><DescriptionEdit groupId={groupId} task={task} saveTask={saveTask} setIsDescriptionEdit={setIsDescriptionEdit} /></div>}
                        </div>
                    </section>

                    {task.attach?.length > 0 &&
                        <>
                            <span className="icon-span attach-icon">{paperclip_icon}</span>
                            <section className="attachments">
                                <h3>Attachments</h3>
                                {task.attach.map((attach, idx) => {
                                    const imgTypes = ['png', 'jpg', 'gif', 'svg']
                                    let fileName = attach.split('/')

                                    return <div className="attach-details" key={idx}>
                                        <div className="attach_img" style={{ backgroundImage: `url(${attach})` }}>
                                            {!imgTypes.find(type => type === attach.slice(-3).toLowerCase()) && attach.slice(-3)}

                                        </div>
                                        <div>
                                            <a className="fileName" target="_blank" href={attach} download>{fileName[fileName.length - 1]} ↗</a>
                                        </div>
                                        <div className="download">
                                            <a className="download" href={attach} download={fileName[fileName.length - 1]}>Download</a>
                                        </div>

                                    </div>
                                })}
                            </section>
                        </>}

                    <section className="checklists">
                        <ChecklistIndex task={task} saveTask={saveTask} groupId={groupId} />
                    </section>
                    <span className="icon-span activity-icon">{activity_icon}</span>
                    <section className="activity-heading">
                        <h3>Activity</h3>
                    </section>
                    <section className="activity">
                        <Activity taskId={taskId} />
                    </section>

                    <section className="actions">
                        <h3>Add to card</h3>
                        <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, MEMBERS)} >{member_icon}Members</a>
                        <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, LABELS)}>{label_icon}Labels</a>
                        <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, CHECKLIST)} >{checked_icon}Checklist</a>
                        <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, DATES)}>{clock_icon}Dates</a>
                        <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, ATTACHMENT)}>{paperclip_icon}Attachment</a>
                        {/* <a className="flex align-center" href="#">{location_icon}Location</a> */}
                        {!(task.style?.backgroundColor || task.style?.backgroundImage) && <a className="flex align-center" href="#" onClick={(ev) => onSetActionType(ev, COVER)}>{cover_icon}Cover</a>}
                        <ClickAwayListener onClickAway={() => { setActionType(null); refTrigger.current = null }}>
                            <div>
                                {(actionType && refTrigger.current !== null) && <DynamicCmp setActionType={setActionType} groupId={groupId} cmp={actionType} task={task} board={board} saveTask={saveTask} refTrigger={refTrigger} offset={{ x: 0, y: refTrigger.current.getBoundingClientRect().height + 8 }} />}
                            </div>
                        </ClickAwayListener>
                    </section>
                </section>
            </ClickAwayListener>
        </section >
    </div>
}