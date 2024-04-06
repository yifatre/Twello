import { useNavigate, useParams } from "react-router"
import { DescriptionEdit } from "./DescriptionEdit"
import { arrow_down, bars_icon, box_icon, check_icon, checked_icon, clock_icon, cover_icon, eye_icon, label_icon, location_icon, member_icon, paperclip_icon, plus_icon, window_icon, x_icon } from "../UtilCmps/SVGs"
import { utilService } from "../../services/util.service"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'



export function TaskDetails({ }) {//task }) {
    const { boardId, groupId, taskId } = useParams()
    const navigate = useNavigate()
    console.log('boardId, groupId, taskId', boardId, groupId, taskId)
    function onAddMember() { }
    function onAddLabel() { }

    const task = {
        "id": "c104",
        "title": "Help me",
        "status": "in-progress", // monday
        "priority": "high",
        "description": "description",
        "comments": [
            {
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            }
        ],
        "checklists": [
            {
                "id": "YEhmF",
                "title": "Checklist",
                "todos": [
                    {
                        "id": "212jX",
                        "title": "To Do 1",
                        "isDone": false
                    }
                ]
            }
        ],
        "memberIds": ["u101"],
        "labelIds": ["l101", "l102"],
        "dueDate": 16156215211,
        "byMember": {
            "_id": "u101",
            "username": "Tal",
            "fullname": "Tal Tarablus",
            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        },
        "style": {
            "backgroundColor": "#26de81"
        }
    }


    function closeTaskDetails() {
        navigate(`/board/${boardId}`)
    }
    
    return <div className="task-details-backdrop">
        <ClickAwayListener onClickAway={closeTaskDetails}>
            <section className="task-details">
                <button className="close-btn" onClick={closeTaskDetails}>{x_icon}</button>
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
                            {task.memberIds.map(memberId => <div key={memberId} className="avatar"></div>)}
                            <button className="avatar" onClick={onAddMember}>{plus_icon}</button>
                        </div>
                    </div>
                    <div className="labels">
                        <h3>Labels</h3>
                        <div className="">
                            {task.labelIds.map(labelId => <div key={labelId} className="label">{labelId}</div>)}
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
                    <a className="flex align-center" href="#">{member_icon}Members</a>
                    <a className="flex align-center" href="#">{label_icon}Labels</a>
                    <a className="flex align-center" href="#">{checked_icon}Checklist</a>
                    <a className="flex align-center" href="#">{clock_icon}Dates</a>
                    <a className="flex align-center" href="#">{paperclip_icon}Attachment</a>
                    <a className="flex align-center" href="#">{location_icon}Location</a>

                </section>

            </section>
        </ClickAwayListener>
    </div>
}