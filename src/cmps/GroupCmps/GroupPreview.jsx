import { collapse_icon, ellipsis_icon, plus_icon, create_icon } from '../UtilCmps/SVGs'

export function GroupPreview({ group }) {
    console.log(group)
    return (
        // <li><pre>{JSON.stringify(group)}</pre></li>
        <li className="group-preview">
            <div className="group-header">
                <h2 className="group-title">{group.title}</h2>
                <button className="collapse">{collapse_icon}</button>
                <button className="options">{ellipsis_icon}</button>
            </div>
            <div className="tasks-container">

            </div>
            <div className='add'>
                <button className="add-task"><span>{plus_icon}</span>Add a card</button>
                <button className="create-from-template">{create_icon}</button>
            </div>
        </li>
    )
}