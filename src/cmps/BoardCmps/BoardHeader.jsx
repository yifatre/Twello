import { userDemoData } from "../../services/demo-data"
import { updateBoard } from "../../store/board/board.actions"
import { AvatarList } from "../UtilCmps/AvatarList"
import { arrow_down, board_icon, ellipsis_icon, filter_icon, flash_icon, group_icon, rocket_icon, share_icon, star, star_outline, table_icon } from "../UtilCmps/SVGs"

export function BoardHeader({ board, setRsbIsOpen }) {
    async function onToggleStar(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        try {
            updateBoard({ ...board, isStarred: !board.isStarred }, true)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <header className="board-header">
            <h1 className="board-title">{board.title}</h1>
            <button className="board-star" onClick={onToggleStar}>{board.isStarred ? <span className="svg-container">{star}</span> : <span className="svg-container">{star_outline}</span>}</button>
            <button className="btn2 visibility">{group_icon}Workspace visible</button>
            <button className="btn2 board-view active">{board_icon}Board</button>
            <button className="btn2 table-view">{table_icon}Table</button>
            <button className="costume-view">{arrow_down}</button>
            <span></span>
            <button className="btn2">{rocket_icon}Power-Ups</button>
            <button className="btn2">{flash_icon}Automation</button>
            <button className="btn2">{filter_icon}Filters</button>
            <span className="sep"></span>
            <div className="users-avatars"><AvatarList users={userDemoData} maxUsers={5} /></div>
            <button className="btn2 board-share active">{share_icon}Share</button>
            <button className="board-options" onClick={() => setRsbIsOpen(true)}>{ellipsis_icon}</button>
        </header>
    )
}

