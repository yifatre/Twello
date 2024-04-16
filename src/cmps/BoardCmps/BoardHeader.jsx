import { useRef, useState } from "react"
import { userDemoData } from "../../services/demo-data"
import { updateBoardOptimistic } from "../../store/board/board.actions"
import { AvatarList } from "../UtilCmps/AvatarList"
import { arrow_down, board_icon, ellipsis_icon, filter_icon, flash_icon, group_icon, rocket_icon, share_icon, star, star_outline, table_icon } from "../UtilCmps/SVGs"
import { ClickAwayListener } from "@mui/base"
import { ADD_BOARD_USER, CREATE_BOARD, DynamicCmp } from "../TaskCmps/DynamicCmps/DynamicCmp"

export function BoardHeader({ board, setRsbIsOpen, setViewType, viewType }) {
    const [isAddMember, setIsAddMember] = useState(false)
    const refTrigger = useRef(null)
    async function onToggleStar(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        try {
            updateBoardOptimistic({ ...board, isStarred: !board.isStarred }, true)
        }
        catch (err) {
            console.error(err)
        }
    }

    function onAddMember(ev) {
        const { currentTarget } = ev

        setIsAddMember(true)
    }

    function onCloseAddModal() {
        setIsAddMember(false)
    }


    return (<>
        <header className="board-header">
            <h1 className="board-title">{board.title}</h1>
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
            <button className="btn2 board-share active" onClick={onAddMember} ref={refTrigger}>{share_icon}Share</button>
            <button className="board-options" onClick={() => setRsbIsOpen(true)}>{ellipsis_icon}</button>
        </header>
        {
            isAddMember && <ClickAwayListener onClickAway={onCloseAddModal}>
                <div style={{ zIndex: 110 }}>
                    <DynamicCmp cmp={{ type: ADD_BOARD_USER }} board={board} setActionType={setIsAddMember} refTrigger={refTrigger} offset={{ x: 0, y: refTrigger.current.getBoundingClientRect().height + 8 }} />
                </div>
            </ClickAwayListener>
        }
    </>
    )
}

