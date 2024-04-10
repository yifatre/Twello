import { utilService } from "../../services/util.service"

export function AvatarList({ users, maxUsers = Infinity }) {

    const dynEl = users.length > maxUsers ? <button className="more">+{users.length - maxUsers}</button> : ''

    return (
        <>
            {dynEl}
            {users.slice(0, maxUsers).map(user => {
                const initials = utilService.getInitials(user.fullName)
                console.log('initials', initials)
                return <div key={user._id} className="avatar">
                    {user.imgUrl
                        ? <img src={user.imgUrl} />
                        : <div className="initials" style={{ backgroundColor: initials.color }}>{initials.initials}</div>}
                </div>
            }
            )}
        </>
    )


}