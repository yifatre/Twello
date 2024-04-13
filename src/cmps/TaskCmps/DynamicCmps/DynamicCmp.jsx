import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { updateBoard } from "../../../store/board/board.actions"
import { AttachmentPicker } from "./AttachmentPicker"
import { CheckList } from "./CheckLlist"
import { CoverPicker } from "./CoverPicker"
import { CreateBoard } from "./CreateBoard"
import { DatePicker } from "./DatePicker"
import { GroupActions } from "./GroupActios"
import { LabelPicker } from "./LabelPicker"
import { MemberPicker } from "./MemberPicker"
import { utilService } from "../../../services/util.service"

export const LABELS = 'LABELS'
export const MEMBERS = 'MEMBERS'
export const DATES = 'DATES'
export const ATTACHMENT = 'ATTACHMENT'
export const COVER = 'COVER_PICKER'
export const CREATE_BOARD = 'CREATE_BOARD'
export const GROUP_ACTIONS = 'GROUP_ACTIONS'
export const CHECKLIST = 'CHECKLIST'


export function DynamicCmp({ setActionType, groupId, cmp, board, task, setIsAddBoard, saveTask, group, saveGroup, setIsActionsOpen, refTrigger, offset = { x: 0, y: 0 } }) {

    const ref = useRef(null)
    const [pos, setPos] = useState(utilService.getModalPosition(refTrigger.current, offset.x, refTrigger.current.getBoundingClientRect().height + offset.y))
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    useEffect(() => {
        function updateSize() {
            // console.log('***resized***')
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => { window.removeEventListener('resize', updateSize) }
    }, [])

    useLayoutEffect(() => {
        console.log('useeffect')
        console.log('refTrigger.current', refTrigger)
        if (ref.current) {
            const modalDim = ref.current.getBoundingClientRect()
            const triggerLocation = refTrigger.current.getBoundingClientRect()
            if (triggerLocation.top + modalDim.height > window.innerHeight) setPos(prevPos => ({ ...prevPos, top: window.innerHeight - modalDim.height }))
            else setPos(prevPos => ({ ...prevPos, top: triggerLocation.top + offset.y }))
            if (triggerLocation.left + modalDim.width > window.innerWidth) setPos(prevPos => ({ ...prevPos, left: window.innerWidth - modalDim.width }))
            else setPos(prevPos => ({ ...prevPos, left: triggerLocation.left + offset.x }))
        }
    }, [windowSize, refTrigger.current])

    function onUpdateBoard(newLabel) {
        const boardToUpdate = { ...board }
        boardToUpdate.labels.push(newLabel)
        updateBoard(boardToUpdate)
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

    function deleteLabel(labelId) {
        const Board = board

        const labels = Board.labels.filter(label => label.id !== labelId)
        Board.labels = labels

        Board.groups = utilService.deleteLabelIdFromEverywhere(Board.groups, labelId)

        updateBoard(Board)
    }

    

    var cmpType
    var topHead
    let top = 24
    const buttonHeight = 40
    switch (cmp) {
        case LABELS:
            top += buttonHeight * 2
            topHead = 'Labels'
            cmpType = <LabelPicker setActionType={setActionType} SaveLabel={SaveLabel} deleteLabel={deleteLabel} onUpdateBoard={onUpdateBoard} task={task} labels={board.labels} saveTask={saveTask} groupId={groupId} />
            break

        case MEMBERS:
            top += buttonHeight
            topHead = 'Member'
            cmpType = <MemberPicker group={group} setActionType={setActionType} members={board.members} task={task} saveTask={saveTask} groupId={groupId} />
            break

        case DATES:
            top += buttonHeight * 4
            topHead = 'Date'
            cmpType = <DatePicker group={group} saveTask={saveTask} setActionType={setActionType} task={task} groupId={groupId} />
            break

        case ATTACHMENT:
            top += buttonHeight * 5
            topHead = 'Attachment'
            cmpType = <AttachmentPicker group={group} setActionType={setActionType} board={board} groupId={groupId} task={task} saveTask={saveTask} />
            break

        case COVER:
            topHead = 'Cover'
            cmpType = <CoverPicker setActionType={setActionType} board={board} groupId={groupId} task={task} saveTask={saveTask} />
            break

        case CREATE_BOARD:
            cmpType = <CreateBoard setIsAddBoard={setIsAddBoard} />
            break

        case GROUP_ACTIONS:
            cmpType = <GroupActions setIsActionsOpen={setIsActionsOpen} group={group} saveGroup={saveGroup} />
            break

        case CHECKLIST:
            cmpType = <CheckList setActionType={setActionType} task={task} saveTask={saveTask} groupId={groupId}/>
            break
    }
    return <div className={`dynamic-cmp ${cmp.toLowerCase()}`} style={{ top: pos.top, left: pos.left, zIndex: 150 }} ref={ref}>
        {cmpType}
    </div>
}


