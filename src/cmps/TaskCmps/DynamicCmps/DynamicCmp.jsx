import { updateBoard } from "../../../store/board/board.actions"
import { AttachmentPicker } from "./AttachmentPicker"
import { CoverPicker } from "./CoverPicker"
import { CreateBoard } from "./CreateBoard"
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import { MemberPicker } from "./MemberPicker"

export const LABELS = 'LABELS'
export const MEMBERS = 'MEMBERS'
export const DATES = 'DATES'
export const ATTACHMENT = 'ATTACHMENT'
export const COVER = 'COVER'
export const CREATE_BOARD = 'CREATE_BOARD'
// onUpdateTask(cmp, info, task ) {
//     //todo info:{groupId,taskId,dynamic}


export function DynamicCmp({ groupId, cmp, board, task, setIsAddBoard, position, saveTask }) {

    function onUpdateBoard(newLabel) {
        const boardToUpdate = { ...board, labels: { ...board.labels, newLabel } }
        updateBoard(boardToUpdate)
    }

    var cmpType
    var topHead
    let top = 24
    const buttonHeight = 40
    switch (cmp) {
        case LABELS:
            top += buttonHeight * 2
            topHead = 'Labels'
            cmpType = <LabelPicker onUpdateBoard={onUpdateBoard} task={task} labels={board.labels} saveTask={saveTask} groupId={groupId} />
            break

        case MEMBERS:
            top += buttonHeight
            topHead = 'Member'
            // todo add 'taskMembers when we connected the actual data ! 
            cmpType = <MemberPicker members={board.members} task={task} saveTask={saveTask} groupId={groupId} />
            break

        case DATES:
            top += buttonHeight * 4
            topHead = 'Date'
            cmpType = <DatePicker board={board} groupId={groupId} />
            break

        case ATTACHMENT:
            top += buttonHeight * 5
            topHead = 'Attachment'
            cmpType = <AttachmentPicker board={board} groupId={groupId} task={task} saveTask={saveTask} />
            break

        case COVER:
            topHead = 'Cover'
            cmpType = <CoverPicker board={board} groupId={groupId} task={task} saveTask={saveTask} />
            break

        case CREATE_BOARD:
            cmpType = <CreateBoard setIsAddBoard={setIsAddBoard} />
            break
    }
    return <div className={`dynamic-cmp ${cmp.toLowerCase()}`} style={{ top: position.top, left: position.left }}>
        {cmpType}
    </div>
}


