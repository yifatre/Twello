import { AttachmentPicker } from "./AttachmentPicker"
import { CoverPicker } from "./CoverPicker"
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import { MemberPicker } from "./MemberPicker"

export const LABELS = 'LABELS'
export const MEMBERS = 'MEMBERS'
export const DATES = 'DATES'
export const ATTACHMENT = 'ATTACHMENT'
export const COVER = 'COVER'



export function DynamicCmp({ cmp, info, onUpdate }) {
    console.log('info', info)
    var cmpType
    var topHead
    let top = 24
    const buttonHeight = 40
    switch (cmp) {
        case LABELS:
            top += buttonHeight * 2
            topHead = 'Labels'
            cmpType = <LabelPicker labels={info.labelIds} onUpdate={onUpdate} />
            break

        case MEMBERS:
            top += buttonHeight
            topHead = 'Member'
            cmpType = <MemberPicker info={info} onUpdate={onUpdate} />
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
    }
    return <div className={`dynamic-cmp ${cmp.toLowerCase()}`} style={{ top }}>
        {cmpType}
    </div>
}


