import { useEffect, useRef, useState } from "react"
import { userDemoData } from "../../services/demo-data"
import { updateBoard, updateBoardOptimistic } from "../../store/board/board.actions"
import { AvatarList } from "../UtilCmps/AvatarList"
import { arrow_down, board_icon, ellipsis_icon, filter_icon, flash_icon, group_icon, rocket_icon, search_icon, share_icon, star, star_outline, table_icon } from "../UtilCmps/SVGs"
import { ClickAwayListener } from "@mui/base"
import { ADD_BOARD_USER, CREATE_BOARD, DynamicCmp, FILTER } from "../TaskCmps/DynamicCmps/DynamicCmp"

export function BoardHeader({ boardFilter, setBoardFilter, board, setRsbIsOpen, setViewType, viewType }) {

    const [titleToEdit, setTitleToEdit] = useState(board.title)
    const [isAddMember, setIsAddMember] = useState(false)
    // Filter
    const [Filter, setFilter] = useState(false)
    const refTrigger = useRef(null)

    useEffect(() => {
        setTitleToEdit(board.title)
        setFilter(false)
    }, [board._id])


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

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setBoardFilter(value)
    }

    function onAddMember(ev) {
        const { currentTarget } = ev

        setIsAddMember(true)
    }

    function onCloseAddModal() {
        setIsAddMember(false)
        setFilter(false)
    }


    function handleChangeTitle({ target }) {
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

    return (<>
        <header className="board-header">
            <h1 className="board-title" style={{ display: 'none' }}>{board.title}</h1>
            <input className="board-title" type="text" style={{ width: !titleToEdit.length ? 1 + 'ch' : titleToEdit.length * 1.4 + 'ch' }} name="board-title" id="board-title" value={titleToEdit} onChange={handleChangeTitle} onKeyDown={onKeyDown} onBlur={() => updateBoardOptimistic({ ...board, title: titleToEdit }, true)} />
            <button className="board-star" onClick={onToggleStar}>{board.isStarred ? <span className="svg-container" style={{ color: "var(--dynamic-star)" }}>{star}</span> : <span className="svg-container">{star_outline}</span>}</button>
            {/* <button className="btn2 visibility">{group_icon}Workspace visible</button> */}
            <button className={`btn2 board-view ${viewType === 'board' ? 'active' : ''}`} onClick={() => setViewType('board')}>{board_icon}Board</button>
            <button className={`btn2 table-view ${viewType === 'table' ? 'active' : ''}`} onClick={() => setViewType('table')}>{table_icon}Table</button>
            <button className="costume-view">{arrow_down}</button>
            <span></span>
            {/* <button className="btn2">{rocket_icon}Power-Ups</button> */}
            {/* <button className="btn2">{flash_icon}Automation</button> */}
            <button onClick={() => setFilter(true)} className="btn2 filter">{filter_icon}Filters</button>
            {/* {!Filter && <button onClick={() => setFilter(true)} className="btn2 filter">{filter_icon}Filters</button>} */}
           
            {/* {Filter &&
                <div className='flex justify-center input-container filter'>
                    <span className='svg-search'>{search_icon}</span>
                    <input onChange={handleChange} placeholder='Search' spellcheck="false" className='search-input' type="text" />
                </div>} */}
            <span className="sep"></span>
            <div className="users-avatars"><AvatarList users={board.members} maxUsers={5} /></div>
            <button className="btn2 board-share active" onClick={onAddMember} ref={refTrigger}>{share_icon}Share</button>
            <button className="board-options" onClick={() => setRsbIsOpen(true)}>{ellipsis_icon}</button>
        </header >
        {Filter && 
            <ClickAwayListener onClickAway={onCloseAddModal}>
            <div style={{ zIndex: 110 }}>
                <DynamicCmp cmp={{ type:FILTER}} setActionType={setFilter} refTrigger={refTrigger}  FilterBy={boardFilter} setBoardFilter={setBoardFilter} board={board} offset={{ x: 0, y: refTrigger.current.getBoundingClientRect().height + 8 }} />
            </div>
        </ClickAwayListener>}
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

