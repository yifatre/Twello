import { AttachmentPicker } from "./AttachmentPiker"
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
    console.log(cmp);
    var cmpType
    var topHead
    switch (cmp) {
        case LABELS:
            topHead = 'Labels'
            cmpType = <LabelPicker info={info} onUpdate={onUpdate} />;
            break

        case MEMBERS:
            topHead = 'Member'
            cmpType = <MemberPicker info={info} onUpdate={onUpdate} />;
            break

        case DATES:
            topHead = 'Date'
            cmpType = <DatePicker info={info} onUpdate={onUpdate} />;
            break

        case ATTACHMENT:
            topHead = 'Attachment'
            cmpType = <AttachmentPicker info={info} onUpdate={onUpdate} />;
            break

        case COVER:
            topHead = 'Cover'
            cmpType = <CoverPicker info={info} onUpdate={onUpdate} />;
            break
    }
    return <div className={`dynamic-cmp ${cmp.toLowerCase()}`}>
        {cmpType}
    </div>
}


