import { useEffect, useState } from "react"
import { arrow_down, edit_icon, x_icon } from "../../UtilCmps/SVGs"
import { boardService } from "../../../services/board/board.service.local"
import { LABELS } from "./DynamicCmp"

const pallet = ['#baf3db', '#f8e6a0', '#fedec8', '#ffd5d2', '#dfd8fd',
    '#4bce97', '#f5cd47', '#fea362', '#f87168', '#9f8fef',
    '#1f845a', '#946f00', '#c25100', '#c9372c', '#6e5dc6',
    '#cce0ff', '#c6edfb', '#d3f1a7', '#fdd0ec', '#dcdfe4',
    '#579dff', '#6cc3e0', '#94c748', '#e774bb', '#8590a2',
    '#0c66e4', '#227d9b', '#5b7f24', '#ae4787', '#626f86']

// todo connect btn's and add the on update 

export function LabelPicker({ onUpdateBoard, taskLabels, labels, onUpdate }) {
    console.log(taskLabels);
    const [toggle, setToggle] = useState(false)
    const [currentColor, setCurrentColor] = useState('#4bce97')
    const [labelContent, setLabelContent] = useState('')
    const [labelsFromTask, setLabelsFromTask] = useState(taskLabels)
    const [dark, setDark] = useState(new Array(pallet.length).fill(false))

    useEffect(()=>{
        onUpdate(LABELS, labelsFromTask)
    },[labelsFromTask])

    function toggleBtn(label) {
        setCurrentColor('#4bce97')
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
        console.log('dark', dark)
        setCurrentColor(color)
    }

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setLabelContent(value)

    }

    function removeColor() {
        setCurrentColor('hsla(218, 54%, 19.6%, 0.16)')
    }

    function onCreate() {
        const newLabel = boardService.getEmptyLabel()

        newLabel.title = labelContent
        newLabel.color = currentColor
        onUpdateBoard(newLabel)

        const _labels = taskLabels.push(newLabel.id)
        onUpdate(LABELS, _labels)
    }

    function onCheckLabel({ target }) {
        if (target.checked) {
            setLabelsFromTask(prevLabels => [...prevLabels,target.id])
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
                            <input defaultChecked={taskLabels ? taskLabels.find(id => label.id === id) : false} onChange={onCheckLabel} className="checkbox" type="checkBox" id={label.id} />
                            <label htmlFor={label.id}> <div style={{ backgroundColor: label.color }} className="label-picker"> {label.title}</div></label>
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
                <span style={{ backgroundColor: currentColor }} className="label-preview">{labelContent}</span>
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
                            <div onClick={() => colorChange(color, index)} style={{ backgroundColor: color }} className={`color ${dark[index] ? 'outsideLine-white' : ''}`}></div>
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


