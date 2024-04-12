import { useNavigate } from "react-router";
import { archive_icon, clock_icon, copy_icon, cover_icon, edit_icon, label_icon, member_icon, move_icon, window_icon } from "../UtilCmps/SVGs";
import { TaskPreview } from "./TaskPreview";
import { CHECKLIST, COVER, DATES, DynamicCmp, LABELS, MEMBERS } from "./DynamicCmps/DynamicCmp";
import { useState } from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { utilService } from "../../services/util.service";

export function TaskQuickEdit({ taskQuickEdit, groupId, removeTask, board, isLabelsExtended, setIsLabelExtended, setTaskQuickEdit, saveTask }) {
    const [actionType, setActionType] = useState(null)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const navigate = useNavigate()

    function onSetActionType(ev, type) {
        ev.preventDefault()
        ev.stopPropagation()
        setModalPosition(utilService.getModalPosition(ev.currentTarget, 0, ev.currentTarget.getBoundingClientRect().height + 8))
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
            <div className="task-quick-edit">
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
                <div className="actions">
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
                            {actionType && <DynamicCmp setActionType={setActionType} groupId={groupId} cmp={actionType} task={taskQuickEdit} position={modalPosition} board={board} saveTask={onSaveTask} />}
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
        </div>
    )
}