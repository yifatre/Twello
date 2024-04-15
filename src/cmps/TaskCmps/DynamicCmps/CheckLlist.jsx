import { useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { utilService } from "../../../services/util.service"
import { boardService } from "../../../services/board/board.service.local"

export function CheckList({ setActionType, task, saveTask, groupId, }) {
    const [title, setTitle] = useState('')


    function handleChange({ target }) {
        setTitle(target.value)
    }

    function onCreate() {
        const _checklist = { id: utilService.makeId(), title: title }
        boardService.getActivity()
        saveTask({ ...task, checklists: [...task.checklists, _checklist] }, groupId)
        setActionType(null)
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
                value={title}
                onChange={handleChange}
            />
            <div className="flex ">
                <button onClick={onCreate} className='create-btn Add-checklist-btn'>Add</button>
            </div>

        </section>
    </>
    )

}