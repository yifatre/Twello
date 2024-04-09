import { updateBoard } from "../../../store/board/board.actions"
import { AttachmentPicker } from "./AttachmentPicker"
import { CoverPicker } from "./CoverPicker"
import { CreateBoard } from "./CreateBoard"
import { DatePicker } from "./DatePicker"
import { GroupActions } from "./GroupActios"
import { LabelPicker } from "./LabelPicker"
import { MemberPicker } from "./MemberPicker"

export const LABELS = 'LABELS'
export const MEMBERS = 'MEMBERS'
export const DATES = 'DATES'
export const ATTACHMENT = 'ATTACHMENT'
export const COVER = 'COVER'
export const CREATE_BOARD = 'CREATE_BOARD'
export const GROUP_ACTIONS = 'GROUP_ACTIONS'


export function DynamicCmp({setActionType, groupId, cmp, board, task, setIsAddBoard, position, saveTask, group, saveGroup, setIsActionsOpen }) {

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
        console.log(board)

        const labels = Board.labels.filter(label => label.id !== labelId)
        Board.labels = labels

        Board.groups = deleteLabelIdFromEverywhere(Board.groups, labelId)

        updateBoard(Board)
        console.log(Board)
    }

    function deleteLabelIdFromEverywhere(data, labelIdToDelete) {
        const updatedData = data.map(group => {
            const updatedTasks = group.tasks.map(task => {
                const updatedTask = { ...task }
                const labelIndex = updatedTask.labelIds.indexOf(labelIdToDelete)
                if (labelIndex !== -1) {
                    updatedTask.labelIds.splice(labelIndex, 1)
                }
                return updatedTask
            })
            return { ...group, tasks: updatedTasks }
        })
        return updatedData
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
            // todo add 'taskMembers when we connected the actual data ! 
            cmpType = <MemberPicker setActionType={setActionType} members={board.members} task={task} saveTask={saveTask} groupId={groupId} />
            break

        case DATES:
            top += buttonHeight * 4
            topHead = 'Date'
            cmpType = <DatePicker saveTask={saveTask} setActionType={setActionType} task={task} groupId={groupId} />
            break

        case ATTACHMENT:
            top += buttonHeight * 5
            topHead = 'Attachment'
            cmpType = <AttachmentPicker setActionType={setActionType} board={board} groupId={groupId} task={task} saveTask={saveTask} />
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
    }
    return <div className={`dynamic-cmp ${cmp.toLowerCase()}`} style={{ top: position.top, left: position.left, zIndex: 150 }}>
        {cmpType}
    </div>
}


