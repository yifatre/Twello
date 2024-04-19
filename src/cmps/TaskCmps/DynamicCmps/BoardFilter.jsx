import { useState } from "react";
import { AvatarPreview } from "../../UtilCmps/AvatarPreview"
import { x_icon } from "../../UtilCmps/SVGs"

export function BoardFilter({ labels, FilterBy, setBoardFilter, members, setActionType }) {
    // let 
    const [indexV, setIndexV] = useState(2)
    const [indexL, setIndexL] = useState(2)
    function valueChange() {
        if (indexV === 2) {
            console.log('hi');
            setIndexV(members.length)
        } else setIndexV(2)
    }

    function onFilterByMember({ target }) {
        const memberId = target.id
        if (target.checked) {
            const newMembers = FilterBy.membersIds ? FilterBy.membersIds : []
            newMembers.push(memberId)
            setBoardFilter(prevFilterBy => ({ ...prevFilterBy, membersIds: newMembers }))
        } else {
            const newFilterMembers = FilterBy.membersIds.filter(Id => Id !== memberId)
            setBoardFilter(prevFilterBy => ({ ...prevFilterBy, membersIds: newFilterMembers }))
        }
    }

    function onFilterByLabel({ target }) {
        const labelId = target.id
        if (target.checked) {
            const newLabels = FilterBy.labelsIds ? FilterBy.labelsIds : []
            console.log("newLabels", newLabels)
            newLabels.push(labelId)
            setBoardFilter(prevFilterBy => ({ ...prevFilterBy, labelsIds: newLabels }))
        } else {
            const newFilterLabels = FilterBy.labelsIds.filter(Id => Id !== labelId)
            setBoardFilter(prevFilterBy => ({ ...prevFilterBy, labelsIds: newFilterLabels }))
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
        <section className="picker-container filter-picker-container">
            <p>Keyword</p>
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
                        {members.map((member, index) => {
                            if (indexV > index) {
                                return <li key={member._id} className="flex align-center member-li">
                                    <input onChange={onFilterByMember} defaultChecked={FilterBy.membersIds ? FilterBy.membersIds.find(id => member._id === id) : false} className="checkbox" type="checkBox" id={member._id} />
                                    <label className="flex align-center label-filter-member" htmlFor={member._id}>
                                        <AvatarPreview user={member} />
                                        <div>{member.fullName}</div>
                                    </label>
                                </li>
                            }
                        })}
                        {indexV !== members.length && <li onClick={() => setIndexV(members.length)} className="flex align-center member-li">Show more members</li>}
                        {indexV === members.length && <li onClick={() => setIndexV(2)} className="flex align-center member-li">Show less members</li>}
                    </ul></>}
            {labels.length &&
                <>
                    <p>labels</p>
                    <ul className="clean-list ul-labels">
                    {labels.map((label, index) => {
                        if (indexL > index) {

                            return <li key={label.id} className="flex align-center">
                                <input  onChange={onFilterByLabel} defaultChecked={FilterBy.labelsIds ? FilterBy.labelsIds.find(id => label._id === id) : false} className="checkbox" type="checkBox" id={label.id} />
                                <label htmlFor={label.id}> <div className={`label-picker ${label.color}`}> {label.title}</div></label>
                            </li>
                        }
                    })}
                        {indexL !== labels.length && <li onClick={() => setIndexL(labels.length)} className="flex align-center member-li">Show more labels</li>}
                        {indexL === labels.length && <li onClick={() => setIndexL(2)} className="flex align-center member-li">Show less labels</li>}
                    </ul></>}
        </section>
    </>
    )
}

