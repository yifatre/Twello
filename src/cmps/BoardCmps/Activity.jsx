import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { AvatarPreview } from "../UtilCmps/AvatarPreview"

export function Activity({ taskId }) {
    const activities = useSelector(storeState => storeState.boardModule.board.activities)
    const members = useSelector(storeState => storeState.boardModule.board.members)

    return (
        <section className={taskId ? 'activity-task' : 'activities-container'} >
            {activities && (taskId ?  activities.filter(activity => (activity.task.id === taskId)): activities).map(activity => {
                const user = members.find(member => member._id === activity.byMemberId)
                if (!user) return
                return <div key={activity.id} className="activity-container flex ">
                    <AvatarPreview user={user} />
                    <div className="activity  flex column" >
                        <div className="activity-description"><h4>{user.fullName} </h4>{activity.txt}</div>
                        <div className="activity-time">{utilService.timeAgo(activity.createdAt)}</div>
                    </div>
                </div>
            })}
        </section>
    )
}