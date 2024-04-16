import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { updateBoardOptimistic } from "../../../store/board/board.actions"
import { AttachmentPicker } from "./AttachmentPicker"
import { CheckList } from "./CheckLlist"
import { CoverPicker } from "./CoverPicker"
import { CreateBoard } from "./CreateBoard"
import { DatePicker } from "./DatePicker"
import { GroupActions } from "./GroupActios"
import { LabelPicker } from "./LabelPicker"
import { MemberPicker } from "./MemberPicker"
import { utilService } from "../../../services/util.service"
import { AddBoardUsers } from "./AddBoardUsers"

export const LABELS = 'LABELS'
export const MEMBERS = 'MEMBERS'
export const DATES = 'DATES'
export const ATTACHMENT = 'ATTACHMENT'
export const COVER = 'COVER_PICKER'
export const CREATE_BOARD = 'CREATE_BOARD'
export const GROUP_ACTIONS = 'GROUP_ACTIONS'
export const CHECKLIST = 'CHECKLIST'
export const ADD_BOARD_USER = 'ADD_BOARD_USER'


export function DynamicCmp({ setActionType, groupId, cmp, board, task, setIsAddBoard, saveTask, group, saveGroup, removeGroup, setIsActionsOpen, refTrigger, offset = { x: 0, y: 0 } }) {

    const ref = useRef(null)
    const [pos, setPos] = useState(utilService.getModalPosition(refTrigger.current, offset.x, refTrigger.current.getBoundingClientRect().height + offset.y))
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const [cmpType, setCmpType] = useState(null)

    useEffect(() => {
        function updateSize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', updateSize)
        updateSize()

        return () => { window.removeEventListener('resize', updateSize) }
    }, [])

    useEffect(() => {
        switch (cmp.type) {
            case LABELS:
                setCmpType(<LabelPicker
                    updateSize={() => setWindowSize({ width: window.innerWidth, height: window.innerHeight })}
                    SaveLabel={SaveLabel} deleteLabel={deleteLabel} labels={board.labels}
                    setActionType={setActionType}
                    onUpdateBoard={onUpdateBoard}
                    task={task} saveTask={saveTask}
                    groupId={groupId} />)
                break

            case MEMBERS:
                setCmpType(<MemberPicker
                    members={board.members}
                    setActionType={setActionType}
                    task={task} saveTask={saveTask}
                    group={group} groupId={groupId} />)
                break

            case DATES:
                setCmpType(<DatePicker
                    setActionType={setActionType}
                    task={task} saveTask={saveTask}
                    group={group} groupId={groupId} />)
                break

            case ATTACHMENT:
                setCmpType(<AttachmentPicker
                    setActionType={setActionType}
                    group={group} groupId={groupId}
                    task={task} saveTask={saveTask} />)
                break

            case COVER:
                setCmpType(<CoverPicker
                    updateSize={() => setWindowSize({ width: window.innerWidth, height: window.innerHeight })}
                    setActionType={setActionType}
                    groupId={groupId}
                    task={task} saveTask={saveTask} />)
                break

            case CREATE_BOARD:
                setCmpType(<CreateBoard
                    setIsAddBoard={setIsAddBoard} />)
                break

            case GROUP_ACTIONS:
                setCmpType(<GroupActions
                    setIsActionsOpen={setIsActionsOpen}
                    group={group} saveGroup={saveGroup} removeGroup={removeGroup} />)
                break

            case CHECKLIST:
                setCmpType(<CheckList
                    setActionType={setActionType}
                    groupId={groupId}
                    task={task} saveTask={saveTask} />)
                break
            case ADD_BOARD_USER:
                setCmpType(<AddBoardUsers
                    setActionType={setActionType}
                    members={board.members}
                    board={board}
                     />)
                break
        }
    }, [cmp])

    useLayoutEffect(() => {
        if (ref.current) {
            const modalDim = ref.current.getBoundingClientRect()
            const triggerLocation = refTrigger.current.getBoundingClientRect()
            if (triggerLocation.top + modalDim.height > window.innerHeight) setPos(prevPos => ({ ...prevPos, top: window.innerHeight - modalDim.height }))
            else setPos(prevPos => ({ ...prevPos, top: triggerLocation.top + offset.y }))
            if (triggerLocation.left + modalDim.width > window.innerWidth) setPos(prevPos => ({ ...prevPos, left: window.innerWidth - modalDim.width }))
            else setPos(prevPos => ({ ...prevPos, left: triggerLocation.left + offset.x }))
        }
    }, [windowSize, cmpType])

    function onUpdateBoard(newLabel) {
        const boardToUpdate = { ...board }
        boardToUpdate.labels.push(newLabel)
        updateBoardOptimistic(boardToUpdate)
    }

    function SaveLabel(editLabel) {
        const newLabels = board.labels.map(label => {
            if (label.id === editLabel.id) return editLabel
            return label
        })
        const boardToUpdate = { ...board }
        boardToUpdate.labels = newLabels
        updateBoardOptimistic(boardToUpdate)
    }

    function deleteLabel(labelId) {
        const Board = board
        const labels = Board.labels.filter(label => label.id !== labelId)
        Board.labels = labels
        Board.groups = utilService.deleteLabelIdFromEverywhere(Board.groups, labelId)

        updateBoardOptimistic(Board)
    }

    return <div className={`dynamic-cmp ${cmp.type.toLowerCase()}`} style={{ top: pos.top, left: pos.left, zIndex: 150 }} ref={ref}>
        {cmpType}
    </div>
}


