import { useState } from "react"
import { edit_icon } from "../UtilCmps/SVGs"


const pallet = ['green', 'yellow', 'orange', 'red', 'purple',
    'green-subtle', 'yellow-subtle', 'orange-subtle', 'red-subtle', 'purple-subtle',
    'green-bolder', 'yellow-bolder', 'orange-bolder', 'red-bolder', 'purple-bolder',
    'blue', 'teal', 'lime', 'magenta', 'gray',
    'blue-subtle', 'teal-subtle', 'lime-subtle', 'magenta-subtle', 'gray-subtle',
    'blue-bolder', 'teal-bolder', 'lime-bolder', 'magenta-bolder', 'gray-bolder']

// todo connect btn's and add the on update 

export function SideBarLabels({board}) {
    // labels
    const [labels, setLabels] = useState(board.labels)
    const [labelsFilter, setLabelsFilter] = useState(board.labels)
    const [value, setValue] = useState(8)
  
    function onEdit(label) {
       
    }
   
    function handleChangeFilter({ target }) {
        let filter = target.value
        const regex = new RegExp(filter, 'i')
        let _labels = labels.filter(label => regex.test(label.title))
        setLabelsFilter(_labels)
        console.log("filter", filter)
    }
  
    function onCreate() {
      
    }

    function moreLabels() {
        setValue(labels.length)
    }

    return <>
       
        <section className="picker-container">
            <input
                type="text"
                name="txt"
                placeholder="Search labels..."

                onChange={handleChangeFilter}
            />
            <p>Labels</p>
            <ul className="clean-list ul-labels ul-labels-side-bar">
                {labelsFilter.map((label, index) => {
                    if (value > index) {
                        return <li key={label.id} className="flex align-center label-side-bar">
                            <label className="label-side-bar-label" htmlFor={label.id}> <div className={`label-picker label-side-bar-label ${label.color}`}> {label.title}</div></label>
                            <button onClick={() => onEdit(label)} className="edit-label">{edit_icon}</button>
                        </li>
                    }
                })}
            </ul>

            <button onClick={() => onCreate()} className="tasks-btn labels-btn">Create a new label</button>
            {labels.length > value ? <button onClick={() => moreLabels()} className="tasks-btn labels-btn">Show more labels</button> : <></>}

            {/* <hr className="between-btn" />
                <button className="tasks-btn labels-btn enable-colorblind">Enable colorblind friendly mode </button> */}
        </section>
    </>


}


