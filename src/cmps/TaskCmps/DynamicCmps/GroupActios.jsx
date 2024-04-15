import { useEffect, useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"

export function GroupActions({ group, saveGroup, setIsActionsOpen }) {

    const [colorToEdit, setColorToEdit] = useState(group.style?.themeColor)

    function colorChange(color) {
        setColorToEdit(color)
        saveGroup({ ...group, style: { ...group.style, themeColor: color } })
    }

    const pallet = ['green-subtle', 'yellow-subtle', 'orange-subtle', 'red-subtle', 'purple-subtle',
        'blue-subtle', 'teal-subtle', 'lime-subtle', 'magenta-subtle', 'gray-subtle']

    return <>
        <header className="dynamic-head-container">
            <h2>List actions</h2>
            <button className="tasks-btn close-btn" onClick={() => setIsActionsOpen(false)}>{x_icon}</button>
        </header>
        <section className="actions flex column">
            <a href="#">Add card</a>
            {/* <a href="#">Copy list</a> */}
            {/* <a href="#">Move list</a> */}
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