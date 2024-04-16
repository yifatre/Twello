import { x_icon } from "../../UtilCmps/SVGs"
import { AvatarPreview } from "../../UtilCmps/AvatarPreview"
import { userServiceHttp } from "../../../services/user.service"
import { useEffect, useState } from "react"
import { updateBoard } from "../../../store/board/board.actions"
import { useSelector } from "react-redux"


export function AddBoardUsers({ board, setActionType}) {
    const members = useSelector(storeState => storeState.boardModule.board.members)
    const [users, setUsers] = useState(userServiceHttp.getUsers())
    console.log("users", users)

    useEffect(() => {
        loadUsers()

    }, [members])

    async function loadUsers() {
        try {
            const users = await userServiceHttp.getUsers()
            setUsers(users)
        }
        catch {
            console.log('users not found');
        }
    }


    function onAddMember(_id, fullName, imgUrl) {
        const member = {
            _id,
            fullName,
            imgUrl
        }
        const boardToUpdate = board
        boardToUpdate.members.push(member)
        updateBoard(boardToUpdate)
    }

    function onRemoveMember(memberId) {
        const boardToUpdate = board
        const membersToUpdate = members.filter(member=> member._id !== memberId)
        boardToUpdate.members = membersToUpdate
        updateBoard(boardToUpdate)

    }

    return (<>
        <header className="dynamic-head-container">
            <h2>Add board members</h2>
            <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container">
            <>
                <p>Board members</p>
                <ul className="clean-list ul-labels">
                    {members.map(member => {
                        return <li key={member._id} className="flex align-center member-li" onClick={()=>onRemoveMember(member._id)}>
                            <AvatarPreview user={member} />
                            <div>{member.fullName}</div>
                        </li>
                    })}
                </ul>
            </>
            {(users.length && !!users.filter(user => !members.find(member => member._id === user._id)).length) &&
                <>
                    <p>App members</p>
                    <ul className="clean-list ul-labels">
                        {users.filter(user => !members.find(member => member._id === user._id))
                        .map(user => {
                            console.log("users", users)
                            return <li key={user._id} className="flex align-center member-li" onClick={() => onAddMember(user._id, user.fullName, user.imgUrl)}>
                                <AvatarPreview user={user} />
                                <div>{user.fullName}</div>
                            </li>
                        })}
                    </ul>
                </>}

        </section>
    </>
    )

}