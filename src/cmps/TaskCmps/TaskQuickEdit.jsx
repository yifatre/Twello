import { useNavigate } from "react-router"
import { archive_icon, clock_icon, copy_icon, cover_icon, edit_icon, label_icon, member_icon, move_icon, window_icon } from "../UtilCmps/SVGs"
import { TaskPreview } from "./TaskPreview"
import { CHECKLIST, COVER, DATES, DynamicCmp, LABELS, MEMBERS } from "./DynamicCmps/DynamicCmp"
import { useEffect, useRef, useState } from "react"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { utilService } from "../../services/util.service"

export function TaskQuickEdit({ taskQuickEdit, groupId, removeTask, board, isLabelsExtended, setIsLabelExtended, setTaskQuickEdit, saveTask, refTrigger }) {
    const [actionType, setActionType] = useState(null)
    const navigate = useNavigate()
    const refActionTrigger = useRef(null)
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const ref = useRef(null)
    const [menuSideClass, setMenuSideClass] = useState('')
    const [position, setPosition] = useState({ top: refTrigger.current.getBoundingClientRect().top, left: refTrigger.current.getBoundingClientRect().left })


    useEffect(() => {
        console.log('position', position)
        function updateSize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => { window.removeEventListener('resize', updateSize) }
    }, [])

    useEffect(() => {
        if (ref.current) {
            const modalDim = ref.current.getBoundingClientRect()
            if (refTrigger.current.getBoundingClientRect().left + modalDim.width > windowSize.width) {
                setMenuSideClass('left-side')
                setPosition({ top: refTrigger.current.getBoundingClientRect().top, right: windowSize.width - refTrigger.current.getBoundingClientRect().right })
            }
            else {
                setMenuSideClass('')
                setPosition({ top: refTrigger.current.getBoundingClientRect().top, left: refTrigger.current.getBoundingClientRect().left })
            }
        }
    }, [windowSize])

    function onSetActionType(ev, type) {
        ev.preventDefault()
        ev.stopPropagation()
        refActionTrigger.current = ev.currentTarget
        setActionType(type)
    }

    function onSaveTask(task, groupId) {
        setTaskQuickEdit(task)
        saveTask(task, groupId)
    }

    function onClickAway() {
        if (!actionType) setTaskQuickEdit(null)
    }

    function onNavigate() {
        navigate(`/board/${board._id}/${groupId}/${taskQuickEdit.id}`)
        setTaskQuickEdit(null)
    }

    function onArchiveTask() {

    }

    return (
        <div className="qe-back-drop" onClick={onClickAway}>
            <div className={`task-quick-edit ${menuSideClass}`} ref={ref} style={position.left ? { top: position.top, left: position.left } : { top: position.top, right: position.right }}>
                <div className="task-preview-container">
                    <TaskPreview
                        task={taskQuickEdit}
                        groupId={groupId}
                        removeTask={removeTask}
                        saveTask={saveTask}
                        board={board}
                        isLabelsExtended={isLabelsExtended}
                        setIsLabelExtended={setIsLabelExtended}
                        setTaskQuickEdit={setTaskQuickEdit} />
                </div>
                <div className={`actions ${menuSideClass}`}>
                    <button className="qe-btn" onClick={onNavigate}>{window_icon}Open card</button>
                    <button className="qe-btn" onClick={(ev) => onSetActionType(ev, LABELS)}>{label_icon}Edit labels</button>
                    <button className="qe-btn" onClick={(ev) => onSetActionType(ev, MEMBERS)}>{member_icon}Change members</button>
                    <button className="qe-btn" onClick={(ev) => onSetActionType(ev, COVER)}>{cover_icon}Change cover</button>
                    <button className="qe-btn" onClick={(ev) => onSetActionType(ev, DATES)}>{clock_icon}Edit dates</button>
                    <button className="qe-btn" >{move_icon}Move</button>
                    <button className="qe-btn" >{copy_icon}Copy</button>
                    <button className="qe-btn" onClick={onArchiveTask}>{archive_icon}Archive</button>

                    <ClickAwayListener onClickAway={() => setActionType(null)}>
                        <div>
                            {actionType && <DynamicCmp setActionType={setActionType} groupId={groupId} cmp={actionType} task={taskQuickEdit} refTrigger={refActionTrigger} offset={{ x: 0, y: refActionTrigger.current.getBoundingClientRect().height + 4 }} board={board} saveTask={onSaveTask} />}
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
        </div>
    )
}