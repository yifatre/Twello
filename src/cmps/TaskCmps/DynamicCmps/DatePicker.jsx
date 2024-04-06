
import { DateRange } from "react-date-range";
import { x_icon } from "../../UtilCmps/SVGs";
import { useState } from 'react';


export function DatePicker({ info, onUpdate }) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    return (<>
        <header className="dynamic-head-container">
            <h2>Dates</h2>
            <button className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <DateRange
            editableDateInputs={true}
            onChange={item => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            showDateDisplay={false}
            // showPreview={false}
            ranges={state}
        />
        <section className="picker-container date-picker-container">
            <ul className="clean-list ul-labels">
                <p>Start date</p>
                <li  className="flex align-center">
                    <input className="checkbox" type="checkBox" />
                    <input className="input-Date-picker" type="text" />
                </li>
                <p>Due date</p>
                <li  className="flex align-center">
                    <input className="checkbox" type="checkBox" />
                    <input className="input-Date-picker" type="text" />
                    <input className="input-Date-picker" type="text" />
                </li>
            </ul>


            <button className="tasks-btn labels-btn save-date-btn">Save</button>
            <button className="tasks-btn labels-btn enable-colorblind">Remove </button>
        </section>
    </>

    )

}

