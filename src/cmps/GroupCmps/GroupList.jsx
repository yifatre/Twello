import { GroupPreview } from "./GroupPreview"

export function GroupList({ groups }) {
    return (
        <ul>
            {groups.map(group => {
                return <GroupPreview key={group.id} group={group} />             
            })}
        </ul>
    )
}