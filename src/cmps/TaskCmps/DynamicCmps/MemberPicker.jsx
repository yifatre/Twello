import { x_icon } from "../../UtilCmps/SVGs";


export function MemberPicker({ taskMembers, members, onUpdate }) {
    console.log(members);
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
            {/* {taskMembers.length &&
                <>
                    <p>Card members</p>
                    <ul className="clean-list ul-labels member-li">
                        {members.map(member => {

                            return <li key={member._id} className="flex align-center">
                                <div>{member.fullname}</div>
                            </li>
                        })}
                    </ul>
                </>
            } */}

            <p>Board members</p>
            <ul className="clean-list ul-labels">
                {members.map(member => {
                    // todo refactor when get the actual data fullname 
                    return <li key={member._id} className="flex align-center  member-li">
                        <img className="avatar" src={member.imgUrl} alt="" />
                        <div>{member.fullName}</div>
                    </li>
                })}
            </ul>

        </section>
    </>
    )

}