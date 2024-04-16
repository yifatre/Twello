import { useState } from "react"
import { userDemoData } from "../../services/demo-data"
import { updateBoard, updateBoardOptimistic } from "../../store/board/board.actions"
import { AvatarList } from "../UtilCmps/AvatarList"
import { arrow_down, board_icon, ellipsis_icon, filter_icon, flash_icon, group_icon, rocket_icon, share_icon, star, star_outline, table_icon } from "../UtilCmps/SVGs"

export function BoardHeader({ board, setRsbIsOpen, setViewType, viewType }) {

    const [titleToEdit, setTitleToEdit] = useState(board.title)
    async function onToggleStar(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        try {
            updateBoardOptimistic({ ...board, isStarred: !board.isStarred }, true)
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleChange({ target }) {
        const { value } = target
        setTitleToEdit(value)
    }

    function onKeyDown(ev) {
        if (ev.key === 'Enter') {
            updateBoardOptimistic({ ...board, title: titleToEdit }, true)
            ev.target.blur()
        }
        else if (ev.key === 'Escape') {
            setTitleToEdit(board.title)
            ev.target.blur()
        }
    }

    return (
        <header className="board-header">
            <h1 className="board-title" style={{ display: 'none' }}>{board.title}</h1>
            <input className="board-title" type="text" style={{ width: titleToEdit.length * 1.2 + 'ch' }} name="board-title" id="board-title" value={titleToEdit} onChange={handleChange} onKeyDown={onKeyDown} onBlur={() => updateBoardOptimistic({ ...board, title: titleToEdit }, true)} />
            <button className="board-star" onClick={onToggleStar}>{board.isStarred ? <span className="svg-container">{star}</span> : <span className="svg-container">{star_outline}</span>}</button>
            {/* <button className="btn2 visibility">{group_icon}Workspace visible</button> */}
            <button className={`btn2 board-view ${viewType === 'board' ? 'active' : ''}`} onClick={() => setViewType('board')}>{board_icon}Board</button>
            <button className={`btn2 table-view ${viewType === 'table' ? 'active' : ''}`} onClick={() => setViewType('table')}>{table_icon}Table</button>
            <button className="costume-view">{arrow_down}</button>
            <span></span>
            {/* <button className="btn2">{rocket_icon}Power-Ups</button> */}
            {/* <button className="btn2">{flash_icon}Automation</button> */}
            <button className="btn2">{filter_icon}Filters</button>
            <span className="sep"></span>
            <div className="users-avatars"><AvatarList users={userDemoData} maxUsers={5} /></div>
            <button className="btn2 board-share active">{share_icon}Share</button>
            <button className="board-options" onClick={() => setRsbIsOpen(true)}>{ellipsis_icon}</button>
        </header>
    )
}

