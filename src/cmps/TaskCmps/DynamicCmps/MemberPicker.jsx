import { useEffect, useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { MEMBERS } from "./DynamicCmp"
import { AvatarPreview } from "../../UtilCmps/AvatarPreview"


export function MemberPicker({setActionType, members, task, saveTask, groupId }) {
    const [memberIdsToUpdate, setMemberIdsToUpdate] = useState(task.memberIds)
    const [memberFilter,setMemberFilter]=useState(members)

    useEffect(() => {
        saveTask({ ...task, memberIds: memberIdsToUpdate }, groupId)
    }, [memberIdsToUpdate])

    function handleChangeFilter({ target }) {
        let filter = target.value
        const regex = new RegExp(filter, 'i')
        let _members = members.filter(member => regex.test(member.fullName))
        setMemberFilter(_members)
        console.log("filter", filter)
    }

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
            <button onClick={()=>setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container">
            <input
                type="text"
                name="txt"
                placeholder="Search members"

                onChange={handleChangeFilter}
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
                        {memberFilter.filter(member => !memberIdsToUpdate.includes(member._id)).map(member => {
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