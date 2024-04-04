import { useParams } from "react-router"

<<<<<<< Updated upstream
export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    console.log('boardId, groupId, taskId', boardId, groupId, taskId)
    return (<>
        <div>Task details</div>
        {/* Description */}
        {/* Description edit */}
    </>
    )
=======
export function TaskDetails({ task }) {
    return <section className="task-details">
        <section className="cover"></section>
        <section className="title"></section>
        <section className="labels"></section>
        <section className="description"></section>
        <section className="members"></section>


    </section>
>>>>>>> Stashed changes
}