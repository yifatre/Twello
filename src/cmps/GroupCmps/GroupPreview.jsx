import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TaskList } from '../TaskCmps/TaskList'
import { collapse_icon, ellipsis_icon, plus_icon, create_icon, extend_icon } from '../UtilCmps/SVGs'
import { useState } from 'react'
import { TaskAdd } from '../TaskCmps/TaskAdd'
import { utilService } from '../../services/util.service'

export function GroupPreview({ group, saveGroup, board, isLabelsExtended, setIsLabelExtended, saveTask, removeTask }) {
    const [isAddMode, setIsAddMode] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isExtended, setIsExtended] = useState(true)
    const [titleToEdit, setTitleToEdit] = useState(group.title)

    function handleClickAway() {
        setIsEditTitle(false)
        group.title = titleToEdit
        saveGroup(group)
    }

    function handleHeaderChange({ target }) {
        setTitleToEdit(target.value)
    }

    return (<>
        {!isExtended && <li className={`group-preview-shrunken ${group.style.themeColor || 'neutral'}`} onClick={() => setIsExtended(true)}>
            <button className="collapse">{extend_icon}</button>
            <h2 className='group-title'>{group.title}</h2>
            <h4 className='tasks-number'>{group.tasks.length}</h4>
        </li>
        }
        {isExtended && <div className={`group-preview ${group.style.themeColor || 'neutral'}`}>

            <div className="group-header">
                {!isEditTitle && <h2 className="group-title" onClick={() => setIsEditTitle(true)}>{group.title}</h2>}
                {isEditTitle &&
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <input className="title-edit" value={titleToEdit} autoFocus={true} onFocus={(ev) => ev.target.select()} onChange={handleHeaderChange} onKeyDown={(ev) => { if (ev.code === 'Enter') handleClickAway() }} />
                    </ClickAwayListener>}
                <button className="collapse" onClick={() => setIsExtended(false)}>{collapse_icon}</button>
                <button className="options">{ellipsis_icon}</button>
            </div>

            <div className="tasks-container">
                <TaskList group={group} saveTask={saveTask} board={board} isLabelsExtended={isLabelsExtended} setIsLabelExtended={setIsLabelExtended} />
            </div>

            {!isAddMode && <div className='add'>
                <button className="add-task" onClick={() => setIsAddMode(true)}>{plus_icon}Add a card</button>
                <button className="create-from-template">{create_icon}</button>
            </div>}
            {isAddMode && <TaskAdd setIsAddMode={setIsAddMode} saveTask={saveTask} groupId={group.id} />}
        </div>}
    </>
    )
}