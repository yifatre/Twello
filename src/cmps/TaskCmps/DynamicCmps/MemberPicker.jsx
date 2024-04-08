import { useEffect, useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { MEMBERS } from "./DynamicCmp"


export function MemberPicker({ members, onUpdate, task }) {
    const [memberIdsToUpdate, setMemberIdsToUpdate] = useState(task.memberIds)
    console.log('board members', members)
    console.log('task members', task.memberIds)

    useEffect(() => {
        onUpdate(MEMBERS, memberIdsToUpdate)
    }, [memberIdsToUpdate])

    function onAddMember(memberId) {
        console.log('memberId', memberId)
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
                    <ul className="clean-list ul-labels member-li">
                        {memberIdsToUpdate.map(memberId => {

                            return <li key={memberId} className="flex align-center" onClick={() => onRemoveMember(memberId)}>
                                <img className="avatar" src={members.find(_member => _member._id === memberId).imgUrl} alt="" />
                                <div>{members.find(member => member._id === memberId).fullName}</div>
                            </li>
                        })}
                    </ul>
                </>
            }
            {!!(members.length - memberIdsToUpdate?.length) &&
                <>
                    <p>Board members</p>
                    <ul className="clean-list ul-labels">
                        {console.log('task.memberIds', task.memberIds)}
                        {members.filter(member => !memberIdsToUpdate.includes(member._id)).map(member => {
                            // todo refactor when get the actual data fullname 
                            return <li key={member._id} className="flex align-center member-li" onClick={() => onAddMember(member._id)}>
                                <img className="avatar" src={member.imgUrl} alt="" />
                                <div>{member.fullName}</div>
                            </li>
                        })}
                    </ul></>}

        </section>
    </>
    )

}