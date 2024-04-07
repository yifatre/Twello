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


export function DynamicCmp({groupId, onUpdateTasks, cmp, info, task, setIsAddBoard,position }) {
    console.log('info:',info);

    function onUpdateBoard(newLabel) {
        const boardToUpdate = { ...info, labels: { ...info.labels, newLabel } }
        updateBoard(boardToUpdate)
    }

    function onUpdate(cmp,dynamic) {
        console.log('dynamic:',dynamic);
        console.log('from dyn:',groupId);
        const _info = {
            groupId,
            taskId:task.id,
            dynamic
        }
        onUpdateTasks(cmp,_info, task )
    }

    var cmpType
    var topHead
    let top = 24
    const buttonHeight = 40
    switch (cmp) {
        case LABELS:
            top += buttonHeight * 2
            topHead = 'Labels'
            cmpType = <LabelPicker onUpdateBoard={onUpdateBoard} taskLabels={task.labelIds} labels={info.labels} onUpdate={onUpdate} />
            break

        case MEMBERS:
            top += buttonHeight
            topHead = 'Member'
            // todo add 'taskMembers when we connected the actual data ! 
            cmpType = <MemberPicker members={info.members} onUpdate={onUpdate} />
            break

        case DATES:
            top += buttonHeight * 4
            topHead = 'Date'
            cmpType = <DatePicker info={info} onUpdate={onUpdate} />
            break

        case ATTACHMENT:
            top += buttonHeight * 5
            topHead = 'Attachment'
            cmpType = <AttachmentPicker info={info} onUpdate={onUpdate} />
            break

        case COVER:
            topHead = 'Cover'
            cmpType = <CoverPicker info={info} onUpdate={onUpdate} />
            break

        case CREATE_BOARD:
            cmpType = <CreateBoard setIsAddBoard={setIsAddBoard} />
            break
    }
    return <div className={`dynamic-cmp ${cmp.toLowerCase()}`} style={{ top:position.top, left:position.left }}>
        {cmpType}
    </div>
}


