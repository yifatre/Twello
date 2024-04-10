import { useEffect, useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { MEMBERS } from "./DynamicCmp"
import { AvatarPreview } from "../../UtilCmps/AvatarPreview"


export function MemberPicker({ members, task, saveTask, groupId }) {
    const [memberIdsToUpdate, setMemberIdsToUpdate] = useState(task.memberIds)

    useEffect(() => {
        saveTask({ ...task, memberIds: memberIdsToUpdate }, groupId)
    }, [memberIdsToUpdate])

    function onAddMember(memberId) {
        if (!task.memberIds) task.memberIds = []
        setMemberIdsToUpdate([...task.memberIds, memberId])
    }

    function onRemoveMember(memberId) {
        setMemberIdsToUpdate(prevMembers => prevMembers.filter(_memberId => _memberId !== memberId))
    }

    return (<>
        <header className="dynamic-head-container">
            <h2>Members</h2>
            <button className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container">
            <input
                type="text"
                name="txt"
                placeholder="Search members"
            />
            {!!memberIdsToUpdate?.length &&
                <>
                    <p>Card members</p>
                    <ul className="clean-list ul-labels">
                        {memberIdsToUpdate.map(memberId => {
                            const member = members.find(_member => _member._id === memberId)
                            return <li key={memberId} className="flex align-center member-li" onClick={() => onRemoveMember(memberId)}>
                                <AvatarPreview user={member} />
                                <div>{member.fullName}</div>
                            </li>
                        })}
                    </ul>
                </>
            }
            {!!(members.length - memberIdsToUpdate?.length) &&
                <>
                    <p>Board members</p>
                    <ul className="clean-list ul-labels">
                        {members.filter(member => !memberIdsToUpdate.includes(member._id)).map(member => {
                            return <li key={member._id} className="flex align-center member-li" onClick={() => onAddMember(member._id)}>
                                <AvatarPreview user={member} />
                                <div>{member.fullName}</div>
                            </li>
                        })}
                    </ul></>}

        </section>
    </>
    )

}