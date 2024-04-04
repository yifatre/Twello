import { edit_icon } from "../UtilCmps/SVGs"

export function TaskPreview({ task }) {

    const { title, style } = task
    return (
        <li className="task-preview"
            style={{
                backgroundColor: style.backgroundColor || '#ffffff',
                backgroundImage: `url(${style.backgroundImage})`
            }}>
            <i className="edit-icon">{edit_icon}</i>
            <a>{title}</a>
        </li>
    )
}