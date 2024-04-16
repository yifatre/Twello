import { utilService } from "../../services/util.service"

export function AvatarPreview({ user }) {
    console.log("user", user)
    let initials
    if (!user.imgUrl) {
        initials = utilService.getInitials((user.fullName?user.fullName:user.fullname))
    }
    return <div className="avatar">
        {user.imgUrl
            ? <img src={user.imgUrl} />
            : <div className="initials" style={{ backgroundColor: initials.color }}>{initials.initials}</div>}
    </div>



}