import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TaskList } from '../TaskCmps/TaskList'
import { collapse_icon, ellipsis_icon, plus_icon, create_icon, extend_icon } from '../UtilCmps/SVGs'
import { useRef, useState } from 'react'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'

import { DynamicCmp, GROUP_ACTIONS } from '../TaskCmps/DynamicCmps/DynamicCmp'
import { utilService } from '../../services/util.service'

export function GroupPreview({boardFilter, group, saveGroup, board, isLabelsExtended, setIsLabelExtended, saveTask, removeTask, removeGroup }) {
    const [isAddMode, setIsAddMode] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isExtended, setIsExtended] = useState(true)
    const [titleToEdit, setTitleToEdit] = useState(group.title)
    const [isActionsOpen, setIsActionsOpen] = useState(false)
    // const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const refTrigger = useRef(null)

    // const scrollRef = useRef(null)

    function handleClickAway() {
        setIsEditTitle(false)
        group.title = titleToEdit
        saveGroup(group)
    }

    function handleHeaderChange({ target }) {
        setTitleToEdit(target.value)
    }

    function onOpenActionsMenu(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        refTrigger.current = ev.currentTarget
        setIsActionsOpen(true)
    }

    return (<>
        {!isExtended && <div className={`group-preview-shrunken ${group.style.themeColor || 'neutral'}`} onClick={() => setIsExtended(true)}>
            <button className="collapse g-btn">{extend_icon}</button>
            <h2 className='group-title'>{group.title}</h2>
            <h4 className='tasks-number'>{group.tasks.length}</h4>
        </div>
        }
        {isExtended && <div className={`group-preview ${group.style.themeColor || 'neutral'}`}>

            <div className="group-header">
                {!isEditTitle && <h2 className="group-title" onClick={() => setIsEditTitle(true)}>{group.title}</h2>}
                {isEditTitle &&
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <MinTextArea className="title-edit" value={titleToEdit} autoFocus={true} onFocus={(ev) => ev.target.select()} onChange={handleHeaderChange} onKeyDown={(ev) => { if (ev.key === 'Enter') handleClickAway() }} ></MinTextArea>
                    </ClickAwayListener>}
                <button className="collapse g-btn" onClick={() => setIsExtended(false)}>{collapse_icon}</button>
                <button className="options g-btn" onClick={onOpenActionsMenu} ref={refTrigger}>{ellipsis_icon}</button>
            </div>

            <div className={`tasks-container `} >
                <TaskList boardFilter={boardFilter} group={group} saveTask={saveTask} board={board} isLabelsExtended={isLabelsExtended} setIsLabelExtended={setIsLabelExtended} isAddMode={isAddMode} setIsAddMode={setIsAddMode} removeTask={removeTask} />
            </div>

            {!isAddMode && <div className='add'>
                <button className="add-task g-btn" onClick={() => setIsAddMode(true)}>{plus_icon}Add a card</button>
                <button className="create-from-template g-btn">{create_icon}</button>
            </div>}
        </div>}
        {isActionsOpen &&
            <ClickAwayListener onClickAway={() => setIsActionsOpen(false)}>
                <div>
                    <DynamicCmp setIsActionsOpen={setIsActionsOpen} cmp={{ type: GROUP_ACTIONS }} refTrigger={refTrigger} offset={{ x: 0, y: refTrigger.current.getBoundingClientRect().height + 9 }} group={group} saveGroup={saveGroup} removeGroup={removeGroup} />
                </div>
            </ClickAwayListener >}
    </>
    )
}