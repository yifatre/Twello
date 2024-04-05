import { useParams } from "react-router"
import { DescriptionEdit } from "./DescriptionEdit"
import { checked_icon, clock_icon, eye_icon, label_icon, member_icon, paperclip_icon, plus_icon, window_icon } from "../UtilCmps/SVGs"


export function TaskDetails({ }) {//task }) {
    const { boardId, groupId, taskId } = useParams()
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


    return <div className="task-details-backdrop">
        <section className="task-details">
            <section className="cover">       </section>
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
            <div className="data">
                <section className="members">
                    <h3>Members</h3>
                    <div className="flex">
                        {task.memberIds.map(memberId => <div key={memberId} className="avatar"></div>)}
                        <button className="avatar" onClick={onAddMember}>{plus_icon}</button>
                    </div>
                </section>
                <section className="labels">
                    {task.labelIds.map(labelId => <div>{labelId}</div>)}
                    <button onClick={onAddLabel}>+</button>

                </section>
                {/* <section className="notifications"></section> */}
            </div>
            <section className="description">
                <DescriptionEdit />
            </section>

            <section className="actions">
                <h3>Add to card</h3>
                <a className="flex align-center" href="#">{member_icon}Members</a>
                <a className="flex align-center" href="#">{label_icon}Labels</a>
                <a className="flex align-center" href="#">{checked_icon}Checklist</a>
                <a className="flex align-center" href="#">{clock_icon}Dates</a>
                <a className="flex align-center" href="#">{paperclip_icon}Attachment</a>
                {/* <a className="flex align-center" href="#">{location_icon}Location</a> */}

            </section>

        </section>
    </div>
}