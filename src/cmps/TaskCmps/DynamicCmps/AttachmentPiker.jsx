import { x_icon } from "../../UtilCmps/SVGs";


export function AttachmentPicker({ info, onUpdate }) {
    return (<>
        <header className="dynamic-head-container">
            <h2>Attach</h2>
            <button className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container attach-section">
            <h2 className="attach-h2">Attach a file from your computer</h2>
            <p>You can also drag and drop files to upload them</p>
            {/* <ul className="clean-list ul-labels">
                    {labels.map(label => {

                        return <li key={label.id} className="flex align-center">
                            <input className="checkbox" type="checkBox" id={label.id} />
                            <label htmlFor={label.id}> <div style={{ backgroundColor: label.color }} className="label-picker"> {label.title}</div></label>
                            <button onClick={() => toggleBtn(label)} className="edit-label">{edit_icon}</button>
                        </li>
                    })}
                </ul> */}

            <button onClick={() => toggleBtn()} className="tasks-btn labels-btn">Create a new label</button>
            <hr className="between-btn" />
            <button className="tasks-btn labels-btn enable-colorblind">Enable colorblind friendly mode </button>
        </section>
    </>
    )

}