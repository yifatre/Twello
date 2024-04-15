import { useEffect, useState } from "react"
import { trello_icon, x_icon } from "../../UtilCmps/SVGs"

export function GroupActions({ group, saveGroup, setIsActionsOpen, removeGroup }) {

    const [colorToEdit, setColorToEdit] = useState(group.style?.themeColor)
    // isDelete
    const [isDelete, setIsDelete] = useState(null)

    function colorChange(color) {
        setColorToEdit(color)
        saveGroup({ ...group, style: { ...group.style, themeColor: color } })
    }

    const pallet = ['green-subtle', 'yellow-subtle', 'orange-subtle', 'red-subtle', 'purple-subtle',
        'blue-subtle', 'teal-subtle', 'lime-subtle', 'magenta-subtle', 'gray-subtle']

    function onDelete() {
        removeGroup(group.id)
    }

    return <>
        <header className="dynamic-head-container">
            <h2>List actions</h2>
            <button className="tasks-btn close-btn" onClick={() => setIsActionsOpen(false)}>{x_icon}</button>
        </header>
        <section className="actions flex column">
            <a className="action-list-item" href="#">Add card</a>
            {/* <a href="#">Copy list</a> */}
            {/* <a href="#">Move list</a> */}
            <a className="action-list-item" href="#" onClick={() => setIsDelete(true)}>Delete list</a>
            {isDelete && <div className="action-list-item confirmation">Are you sure? <button className="tasks-btn" onClick={() => setIsDelete(false)}>Cancel</button><button className="tasks-btn del-btn" onClick={onDelete}>Delete</button></div>}
            {/* <a href="#">Watch</a> */}
        </section>
        <hr class="st-current"></hr>
        <section className="picker-container group-color-picker-container">
            <p>Change list color</p>
            <div className="color-pallet">
                {pallet.map((color, index) => {
                    return <div key={color} className={`color-container ${group.style?.themeColor === color.slice(0, -7) ? 'outsideLine' : ''}`}>
                        <div onClick={() => colorChange(color.slice(0, -7))} className={`color ${color} ${group.style.themeColor === color.slice(0, -7) ? 'outsideLine-white' : ''}`}></div>
                    </div>
                })}
            </div>
            <button onClick={() => colorChange('neutral')} disabled={colorToEdit === 'neutral'} className="tasks-btn labels-btn ">{x_icon}Remove color</button>
        </section>
    </>
}