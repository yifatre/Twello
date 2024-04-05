import { edit_icon } from "../../UtilCmps/SVGs";


export function LabelPicker({ info, onUpdate }) {
    return (
        <section className="picker-container">
            <input
                type="text"
                name="txt"
                placeholder="Search labels..."
            />
            <p>Labels</p>
            <ul className="clean-list ul-labels">
                <li className="flex align-center">
                    <input className="checkbox" type="checkBox" id="checkbox1" />
                    <label htmlFor="checkbox1"> <div style={{ backgroundColor: 'rgb(245, 205, 71)' }} className="label-picker"> Design Team</div></label>
                    <button className="edit-label">{edit_icon}</button>
                </li>
            </ul>

            <button className="tasks-btn labels-btn">Create a new label</button>
            <hr className="between-btn" />
            <button className="tasks-btn labels-btn">Enable colorblind friendly mode </button>
        </section>
    )

}