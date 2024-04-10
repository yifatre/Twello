import { utilService } from "../../services/util.service"

export function AvatarPreview({ user }) {
console.log('user', user)
    const initials = utilService.getInitials(user.fullName)
    return <div className="avatar">
        {user.imgUrl
            ? <img src={user.imgUrl} />
            : <div className="initials" style={{ backgroundColor: initials.color }}>{initials.initials}</div>}
    </div>



}