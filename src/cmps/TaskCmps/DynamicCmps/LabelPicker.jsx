import { useEffect, useState } from "react"
import { arrow_down, edit_icon, new_board_demo, x_icon } from "../../UtilCmps/SVGs"
import { boardService } from "../../../services/board/board.service.local"
import { LABELS } from "./DynamicCmp"
import { useSelector } from "react-redux"

const pallet = ['green', 'yellow', 'orange', 'red', 'purple',
    'green-subtle', 'yellow-subtle', 'orange-subtle', 'red-subtle', 'purple-subtle',
    'green-bolder', 'yellow-bolder', 'orange-bolder', 'red-bolder', 'purple-bolder',
    'blue', 'teal', 'lime', 'magenta', 'gray',
    'blue-subtle', 'teal-subtle', 'lime-subtle', 'magenta-subtle', 'gray-subtle',
    'blue-bolder', 'teal-bolder', 'lime-bolder', 'magenta-bolder', 'gray-bolder']

// todo connect btn's and add the on update 

export function LabelPicker({ setActionType, SaveLabel, deleteLabel, onUpdateBoard, labels, task, saveTask, groupId }) {
    const [labelsFilter,setLabelsFilter] = useState(labels)
    const [value, setValue] = useState(8)
    const [toggle, setToggle] = useState(false)
    const [currentColor, setCurrentColor] = useState('green-subtle')
    const [labelContent, setLabelContent] = useState('')
    const [labelId, setLabelId] = useState('')
    const [labelsFromTask, setLabelsFromTask] = useState(task.labelIds)
    const [dark, setDark] = useState(new Array(pallet.length).fill(false))

    useEffect(() => {
        saveTask({ ...task, labelIds: labelsFromTask }, groupId)
        console.log('im not good');
    }, [labelsFromTask])

    function toggleBtn(label) {
        setCurrentColor('green-subtle')
        setLabelContent('')
        if (label) {
            setLabelContent(label.title)
            setLabelId(label.id)
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

    function handleChangeFilter({ target }) {
        let filter = target.value
        const regex = new RegExp(filter, 'i')
        let _labels = labels.filter(label => regex.test(label.title))
        setLabelsFilter(_labels)
        // console.log("filter", filter)
    }

    function removeColor() {
        setCurrentColor('neutral-label')
    }

    function onCreate() {
        const newLabel = boardService.getEmptyLabel()

        newLabel.title = labelContent
        newLabel.color = currentColor
        onUpdateBoard(newLabel)
        toggleBtn()

        setLabelsFromTask(prevLabels => [...prevLabels, newLabel.id])
    }


    function onDeleteLabel(labelId) {
        const newLabels = labelsFromTask.filter(label => label.id !== labelId)
        deleteLabel(labelId, newLabels)
        toggleBtn()
    }

    function onCheckLabel({ target }) {
        if (target.checked) {
            setLabelsFromTask(prevLabels => [...prevLabels, target.id])
        } else {
            const _labels = labelsFromTask.filter(id => target.id !== id)
            setLabelsFromTask(_labels)
        }
    }

    function onSaveLabel(labelId) {
        const editLabel = {
            id: labelId,
            title: labelContent,
            color: currentColor
        }
        SaveLabel(editLabel)
        toggleBtn()
    }

    function moreLabels() {
        setValue(labels.length)
    }

    {
        if (!toggle) return <>
            <header className="dynamic-head-container">
                <h2>Label</h2>
                <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
            </header>
            <section className="picker-container">
                <input
                    type="text"
                    name="txt"
                    placeholder="Search labels..."

                    onChange={handleChangeFilter}
                />
                <p>Labels</p>
                <ul className="clean-list ul-labels">
                    {labelsFilter.map((label, index) => {
                        if (value > index) {

                            return <li key={label.id} className="flex align-center">
                                <input defaultChecked={task.labelIds ? task.labelIds.find(id => label.id === id) : false} onChange={onCheckLabel} className="checkbox" type="checkBox" id={label.id} />
                                <label htmlFor={label.id}> <div className={`label-picker ${label.color}`}> {label.title}</div></label>
                                <button onClick={() => toggleBtn(label)} className="edit-label">{edit_icon}</button>
                            </li>
                        }
                    })}
                </ul>

                <button onClick={() => toggleBtn()} className="tasks-btn labels-btn">Create a new label</button>
                {labels.length > value ? <button onClick={() => moreLabels()} className="tasks-btn labels-btn">Show more labels</button> : <></>}

                {/* <hr className="between-btn" />
                <button className="tasks-btn labels-btn enable-colorblind">Enable colorblind friendly mode </button> */}
            </section>
        </>

    } return (
        <>
            <header className="dynamic-head-container">
                <button onClick={() => toggleBtn()} className="tasks-btn back-btn">{arrow_down}</button>
                <h2>Create label</h2>
                <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
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

                {(!labelId) &&
                    <>
                        <button onClick={() => removeColor()} className="tasks-btn labels-btn ">{x_icon}Remove color</button>
                        <hr className="between-btn" />
                        <button onClick={() => onCreate()} className='create-btn'>Create</button>
                    </>
                }
                {(labelId) &&
                    <>
                        <button onClick={() => removeColor()} className="tasks-btn labels-btn ">{x_icon}Remove color</button>
                        <hr className="between-btn" />
                        <div className="save-label-container flex justify-space-between">
                            <button onClick={() => onSaveLabel(labelId)} className='create-btn save-btn'>Save</button>
                            <button onClick={() => onDeleteLabel(labelId)} className='create-btn delete-btn'>Delete</button>
                        </div>
                    </>
                }
            </section>
        </>

    )



}


