import { useState } from "react"
import { edit_icon, x_icon } from "../UtilCmps/SVGs"
import { utilService } from "../../services/util.service"
import { boardService } from "../../services/board/board.service.local"
import { updateBoard } from "../../store/board/board.actions"


const pallet = ['green', 'yellow', 'orange', 'red', 'purple',
    'green-subtle', 'yellow-subtle', 'orange-subtle', 'red-subtle', 'purple-subtle',
    'green-bolder', 'yellow-bolder', 'orange-bolder', 'red-bolder', 'purple-bolder',
    'blue', 'teal', 'lime', 'magenta', 'gray',
    'blue-subtle', 'teal-subtle', 'lime-subtle', 'magenta-subtle', 'gray-subtle',
    'blue-bolder', 'teal-bolder', 'lime-bolder', 'magenta-bolder', 'gray-bolder']

// todo connect btn's and add the on update 

export function SideBarLabels({topHead, board,setBackTo,setTopHead }) {
    const [toggle, setToggle] = useState(false)
    const [labels, setLabels] = useState(board.labels)
    const [labelsFilter, setLabelsFilter] = useState(board.labels)
    const [value, setValue] = useState(8)
    const [currentColor, setCurrentColor] = useState('green-subtle')
    const [labelContent, setLabelContent] = useState('')
    const [dark, setDark] = useState(new Array(pallet.length).fill(false))
    const [labelId, setLabelId] = useState('')

    function toggleBtn(label) {
        if(topHead === 'Labels'){
            setTopHead('Create new label')
            setBackTo('Labels')
        }else {
            setTopHead('Labels')
            setBackTo('Menu')
        }
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
        console.log("filter", filter)
    }

    function colorChange(color, index) {
        let result = [...dark].fill(false)
        result[index] = !result[index]
        setDark(result)
        // console.log('dark', dark)
        setCurrentColor(color)
    }

    function onCreate() {
        const newLabel = boardService.getEmptyLabel()

        newLabel.title = labelContent
        newLabel.color = currentColor
        const boardToUpdate = board
        boardToUpdate.labels.push(newLabel)
        updateBoard(boardToUpdate)
        setToggle(!toggle)
    }

    function moreLabels() {
        setValue(labels.length)
    }

    function SaveLabel(editLabel) {
        const newLabels = board.labels.map(label => {
            if (label.id === editLabel.id) return editLabel
            return label
        })
        const boardToUpdate = { ...board }
        boardToUpdate.labels = newLabels
        updateBoard(boardToUpdate)
    }

    function onDeleteLabel(labelId) {
        const Board = board

        const labels = Board.labels.filter(label => label.id !== labelId)
        Board.labels = labels

        Board.groups = utilService.deleteLabelIdFromEverywhere(Board.groups, labelId)

        updateBoard(Board)
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

    {
        if (topHead === 'Labels') return <>

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


