import { utilService } from "../../services/util.service"

export function AvatarList({ users, maxUsers = Infinity }) {

    const colors = ["#5243AA", "#0053CC", "#DE350B", "#172B4D"]

    function getInitials(name) {
        return name
            .match(/(\b\S)?/g)
            .join("")
            .match(/(^\S|\S$)?/g)
            .join("");
    }

    const dynEl = users.length > maxUsers ? <button className="more">+{users.length - maxUsers}</button>: ''

    return (
        <>
            {users.slice(0, maxUsers).map(user =>
                // <AvatarPreview user={user}/>
                <div key={user._id} className="avatar">
                    {user.imgUrl
                        ? <img src={user.imgUrl} />
                        : <div className="initials" style={{ backgroundColor: colors[utilService.getRandomIntInclusive(0, colors.length - 1)] }}>{getInitials(user.fullName)}</div>}
                </div>
            )}
            {dynEl}
        </>
    )


}