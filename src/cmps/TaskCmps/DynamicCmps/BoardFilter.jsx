import { AvatarPreview } from "../../UtilCmps/AvatarPreview"
import { x_icon } from "../../UtilCmps/SVGs"

export function BoardFilter({ FilterBy, setBoardFilter, members, setActionType }) {
    console.log("FilterBy", FilterBy)


    function onFilterByMember({ target }) {
        const memberId = target.id
        if (target.checked) {
            const newMembers = FilterBy.membersIds ? FilterBy.membersIds : []
            console.log("newMembers", newMembers)
            newMembers.push(memberId)
            setBoardFilter(prevFilterBy => ({ ...prevFilterBy, membersIds: newMembers }))
        } else {
            const newFilterMembers = FilterBy.membersIds.filter(Id => Id !== memberId)
            setBoardFilter(prevFilterBy => ({ ...prevFilterBy, membersIds: newFilterMembers }))
        }
    }

    // working!
    function handleChangeFilter({ target }) {
        let filter = target.value
        setBoardFilter(prevFilterBy => ({ ...prevFilterBy, filterBy: filter }))
    }


    return (<>
        <header className="dynamic-head-container">
            <h2>Filter</h2>
            <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container">
            <input
                type="text"
                name="txt"
                placeholder="Search"

                onChange={handleChangeFilter}
            />
            {members.length &&
                <>
                    <p>Members</p>
                    <ul className="clean-list ul-labels">
                        {members.map(member => {
                            return <li key={member._id} className="flex align-center member-li">
                                <input onChange={onFilterByMember} defaultChecked={FilterBy.membersIds?FilterBy.membersIds.find(id=>member._id === id):false} className="checkbox" type="checkBox" id={member._id} />
                                <label className="flex" htmlFor={member._id}>
                                    <AvatarPreview user={member} />
                                    <div>{member.fullName}</div>
                                </label>
                            </li>
                        })}
                    </ul></>}

        </section>
    </>
    )
}

