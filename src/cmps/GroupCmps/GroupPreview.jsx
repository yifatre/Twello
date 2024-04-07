import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TaskList } from '../TaskCmps/TaskList'
import { collapse_icon, ellipsis_icon, plus_icon, create_icon } from '../UtilCmps/SVGs'
import { useEffect, useState } from 'react'
import { TaskAdd } from '../TaskCmps/TaskAdd'

export function GroupPreview({ items, id, activeId, group, board }) {
    const [isAddMode, setIsAddMode] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isExtended, setIsExtended] = useState(true)
    // function handleTitleChange({ target }) {
    // }

    function handleClickAway() {
        setIsEditTitle(false)
    }
    if (!isExtended) return (
        <li className={`group-preview-shrunken ${group.style.themeColor || 'gray'}`} onClick={() => setIsExtended(true)}>
            <button className="collapse">{collapse_icon}</button>
            <h2 className='group-title'>{group.title}</h2>
            <h4 className='tasks-number'>{group.tasks.length}</h4>
        </li>
    )

    return (
        isExtended && <li className={`group-preview ${group.style.themeColor || 'gray'}`}>
            <div className="group-header">
                {!isEditTitle && <h2 className="group-title" onClick={() => setIsEditTitle(true)}>{group.title}</h2>}
                {isEditTitle &&
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <input className="title-edit" value={group.title} autoFocus={true} onFocus={(ev) => ev.target.select()} />
                    </ClickAwayListener>}
                <button className="collapse" onClick={() => setIsExtended(false)}>{collapse_icon}</button>
                <button className="options">{ellipsis_icon}</button>
            </div>
            <div className="tasks-container">

                <TaskList items={items} activeId={activeId} id={id} groupId={group.id} board={board} />

            </div>
            {!isAddMode && <div className='add'>
                <button className="add-task" onClick={() => setIsAddMode(true)}>{plus_icon}Add a card</button>
                <button className="create-from-template">{create_icon}</button>
            </div>}
            {isAddMode && <TaskAdd setIsAddMode={setIsAddMode} />}
        </li>


    )
}