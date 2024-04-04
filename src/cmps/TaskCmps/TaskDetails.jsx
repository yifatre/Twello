import { useParams } from "react-router"

export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    console.log('boardId, groupId, taskId', boardId, groupId, taskId)
    return (<>
        <div>Task details</div>
        {/* Description */}
        {/* Description edit */}
    </>
    )
}