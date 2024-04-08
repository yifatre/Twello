import { useEffect, useState } from "react"
import { arrow_down, edit_icon, x_icon } from "../../UtilCmps/SVGs"
import { boardService } from "../../../services/board/board.service.local"
import { LABELS } from "./DynamicCmp"

const pallet = ['green', 'yellow', 'orange', 'red', 'purple',
    'green-subtle', 'yellow-subtle', 'orange-subtle', 'red-subtle', 'purple-subtle',
    'green-bolder', 'yellow-bolder', 'orange-bolder', 'red-bolder', 'purple-bolder',
    'blue', 'teal', 'lime', 'magenta', 'gray',
    'blue-subtle', 'teal-subtle', 'lime-subtle', 'magenta-subtle', 'gray-subtle',
    'blue-bolder', 'teal-bolder', 'lime-bolder', 'magenta-bolder', 'gray-bolder']

// todo connect btn's and add the on update 

export function LabelPicker({ onUpdateBoard, labels, task, saveTask, groupId }) {
    // console.log(taskLabels);
    const [toggle, setToggle] = useState(false)
    const [currentColor, setCurrentColor] = useState('green-subtle')
    const [labelContent, setLabelContent] = useState('')
    const [labelsFromTask, setLabelsFromTask] = useState(task.labelIds)
    const [dark, setDark] = useState(new Array(pallet.length).fill(false))

    useEffect(() => {
        // onUpdate(LABELS, labelsFromTask)
        saveTask({ ...task, labelIds: labelsFromTask }, groupId)
    }, [labelsFromTask])

    function toggleBtn(label) {
        setCurrentColor('green-subtle')
        setLabelContent('')
        if (label) {
            setLabelContent(label.title)
            setCurrentColor(label.color)
        }
        let result = [...dark].fill(false)
        setDark(result)

        setToggle(!toggle)
    }

    function colorChange(color, index) {
        let result = [...dark].fill(false)
        result[index] = !result[index]
        setDark(result)
        // console.log('dark', dark)
        setCurrentColor(color)
    }

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setLabelContent(value)

    }

    function removeColor() {
        setCurrentColor('neutral-label')
    }

    function onCreate() {
        const newLabel = boardService.getEmptyLabel()

        newLabel.title = labelContent
        newLabel.color = currentColor
        onUpdateBoard(newLabel)

        const _labels = task.labelIds.push(newLabel.id)
        onUpdate(LABELS, _labels)
    }

    function onCheckLabel({ target }) {
        if (target.checked) {
            setLabelsFromTask(prevLabels => [...prevLabels, target.id])
        } else {
            const _labels = labelsFromTask.filter(id => target.id !== id)
            setLabelsFromTask(_labels)
        }
    }

    {
        if (!toggle) return <>
            <header className="dynamic-head-container">
                <h2>Label</h2>
                <button className="tasks-btn close-btn">{x_icon}</button>
            </header>
            <section className="picker-container">
                <input
                    type="text"
                    name="txt"
                    placeholder="Search labels..."
                />
                <p>Labels</p>
                <ul className="clean-list ul-labels">
                    {labels.map(label => {
                        return <li key={label.id} className="flex align-center">
                            <input defaultChecked={task.labelIds ? task.labelIds.find(id => label.id === id) : false} onChange={onCheckLabel} className="checkbox" type="checkBox" id={label.id} />
                            <label htmlFor={label.id}> <div className={`label-picker ${label.color}`}> {label.title}</div></label>
                            <button onClick={() => toggleBtn(label)} className="edit-label">{edit_icon}</button>
                        </li>
                    })}
                </ul>

                <button onClick={() => toggleBtn()} className="tasks-btn labels-btn">Create a new label</button>
                <hr className="between-btn" />
                <button className="tasks-btn labels-btn enable-colorblind">Enable colorblind friendly mode </button>
            </section>
        </>

    } return (
        <>
            <header className="dynamic-head-container">
                <button onClick={() => toggleBtn()} className="tasks-btn back-btn">{arrow_down}</button>
                <h2>Create label</h2>
                <button className="tasks-btn close-btn">{x_icon}</button>
            </header>
            <div className="label-preview-container">
                <span className={`label-preview ${currentColor}`}>{labelContent}</span>
            </div>
            <section className="picker-container">
                <p>Title</p>
                <input
                    type="text"
                    name="txt"
                    value={labelContent}

                    onChange={handleChange}
                />
                <p>Select a color</p>
                <div className="color-pallet">
                    {pallet.map((color, index) => {
                        return <div key={color} className={`color-container ${dark[index] ? 'outsideLine' : ''}`}>
                            <div onClick={() => colorChange(color, index)} className={`color ${color} ${dark[index] ? 'outsideLine-white' : ''}`}></div>
                        </div>
                    })}
                </div>


                <button onClick={() => removeColor()} className="tasks-btn labels-btn ">{x_icon}Remove color</button>
                <hr className="between-btn" />
                <button onClick={() => onCreate()} className='create-btn'>create</button>
            </section>
        </>

    )



}


