import { useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { utilService } from "../../../services/util.service"
import { boardService } from "../../../services/board/board.service"

export function CheckList({ setActionType, task, saveTask, groupId, group }) {
    const [title, setTitle] = useState('Checklist')


    function handleChange({ target }) {
        setTitle(target.value)
    }

    function onCreate() {
        if (!task.checklists) {
            task.checklists = []
        }
        const _checklist = { id: utilService.makeId(), title: title }
        // todo add logged in user
        const activity = boardService.getActivity(`added Checklist to ${task.title}`, 0, group, task,)
        saveTask({ ...task, checklists: [...task.checklists, _checklist] }, groupId, activity)
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
                onFocus={(ev) => ev.target.select()}
                autoFocus
                onKeyDown={(ev) => { if (ev.key === 'Enter') onCreate() }}
            />
            <div className="flex ">
                <button onClick={onCreate} className='create-btn Add-checklist-btn'>Add</button>
            </div>

        </section>
    </>
    )

}