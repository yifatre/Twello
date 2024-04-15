import { useEffect, useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { MEMBERS } from "./DynamicCmp"
import { AvatarPreview } from "../../UtilCmps/AvatarPreview"
import { boardService } from "../../../services/board/board.service"


export function MemberPicker({group,setActionType, members, task, saveTask, groupId }) {
    const [memberIdsToUpdate, setMemberIdsToUpdate] = useState(task.memberIds)
    const [memberFilter,setMemberFilter]=useState(members)
    const [activity, setActivity] = useState() 

    useEffect(() => {
        saveTask({ ...task, memberIds: memberIdsToUpdate }, groupId,activity)
    }, [memberIdsToUpdate])

    function handleChangeFilter({ target }) {
        let filter = target.value
        const regex = new RegExp(filter, 'i')
        let _members = members.filter(member => regex.test(member.fullName))
        setMemberFilter(_members)
        // console.log("filter", filter)
    }

    function onAddMember(memberId,name) {
         //todo add the member !!! now its 0 for development
        setActivity(boardService.getActivity(`added ${name}`,0,group,task))
        if (!task.memberIds) task.memberIds = []
        setMemberIdsToUpdate([...memberIdsToUpdate, memberId])
    }

    function onRemoveMember(memberId,name) {
         //todo add the member !!! now its 0 for development
        setActivity(boardService.getActivity(`removed  ${name}`,0,group,task))
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
                            return <li key={memberId} className="flex align-center member-li" onClick={() => onRemoveMember(memberId,member.fullName)}>
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
                            return <li key={member._id} className="flex align-center member-li" onClick={() => onAddMember(member._id,member.fullName)}>
                                <AvatarPreview user={member} />
                                <div>{member.fullName}</div>
                            </li>
                        })}
                    </ul></>}

        </section>
    </>
    )

}