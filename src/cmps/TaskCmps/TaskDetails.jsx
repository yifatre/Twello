import { useParams } from "react-router"
import { DescriptionEdit } from "./DescriptionEdit"


export function TaskDetails({ task }) {
    function onAddMember(){}


    return <section className="task-details">
        <section className="cover">       </section>
        <section className="title">
            <textarea name="title" id="title" value={task.title}></textarea>
            {/* {task.title} */}
        </section>
        <section className="labels">
            {task.memberIds.map(memberId => <div>{memberId}</div>)}
            <button onClick={onAddMember}>+</button>

        </section>
        {/* <section className="notifications"></section> */}
        <section className="members">
            {task.memberIds.map(memberId => <div>{memberId}</div>)}
            <button onClick={onAddMember}>+</button>
        </section>
        <section className="description">
            <DescriptionEdit />
        </section>


    </section>
}