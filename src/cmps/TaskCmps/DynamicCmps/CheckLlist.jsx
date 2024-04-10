import { useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"

export function CheckList() {
    const [value, setValue] = useState('CheckList')


    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setValue(value)
    }

    return (<>
        <header className="dynamic-head-container">
            <h2>Checklist</h2>
            <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container">
            <p>Title</p>
            <input
                type="text"
                name="txt"
                value={value}

                onChange={handleChange}
            />
            <div className="flex ">
                <button onClick={() => onCreate()} className='create-btn Add-checklist-btn'>Add</button>
            </div>

        </section>
    </>
    )

}