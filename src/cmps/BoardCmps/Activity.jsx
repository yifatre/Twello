import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

export function Activity(){
    const activities = useSelector(storeState => storeState.boardModule.board.activities)
    console.log("activities", activities)
    
    return (
        <section className="activities-container flex column">
            {activities.map(activity =>{
               return <div className="activity-container flex ">
                    <div className="avatar">{activity.byMemberId}</div>
                    <div flex column>
                    <div className="activity-description">{activity.txt}</div>
                    <div className="activity-time">{utilService.timeAgo(activity.createdAt)}</div>
                    </div>
                </div>
            })}
        </section>
    )
}