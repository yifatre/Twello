import { GroupPreview } from "./GroupPreview"

export function GroupList({ groups }) {
    return (
        <ul className="clean-list flex group-list">
            {groups.map(group => {
                return <GroupPreview key={group.id} group={group} />             
            })}
        </ul>
    )
}