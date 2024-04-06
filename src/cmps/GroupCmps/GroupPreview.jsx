import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TaskList } from '../TaskCmps/TaskList'
import { collapse_icon, ellipsis_icon, plus_icon, create_icon } from '../UtilCmps/SVGs'
import { useEffect, useState } from 'react'
import { TaskAdd } from '../TaskCmps/TaskAdd'

export function GroupPreview({ items, id, activeId, group }) {
    const [isAddMode, setIsAddMode] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)

    // function handleTitleChange({ target }) {
    // }

    function handleClickAway() {
        setIsEditTitle(false)
    }

    return (
        // <li><pre>{JSON.stringify(group)}</pre></li>
        <li className={`group-preview ${group.style.themeColor || 'gray'}`}>
            <div className="group-header">
                {!isEditTitle && <h2 className="group-title" onClick={() => setIsEditTitle(true)}>{group.title}</h2>}
                {isEditTitle && 
                <ClickAwayListener onClickAway={handleClickAway}>
                    <input className="title-edit" value={group.title} autoFocus={true} onFocus={(ev)=> ev.target.select()}/>
                </ClickAwayListener>}
                <button className="collapse">{collapse_icon}</button>
                <button className="options">{ellipsis_icon}</button>
            </div>
            <div className="tasks-container">

                <TaskList items={items} activeId={activeId} id={id} groupId={group.id} />

            </div>
            {!isAddMode && <div className='add'>
                <button className="add-task" onClick={() => setIsAddMode(true)}>{plus_icon}Add a card</button>
                <button className="create-from-template">{create_icon}</button>
            </div>}
            {isAddMode && <TaskAdd setIsAddMode={setIsAddMode} />}
        </li>
    )
}