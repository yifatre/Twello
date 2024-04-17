import { useEffect, useRef, useState } from "react"
import { arrow_down, board_icon, calender_icon, member_icon, plus_icon, settings_icon, side_arrow_icon, star, star_outline, table_icon, trello_icon } from "../UtilCmps/SVGs"
import { useSelector } from "react-redux"
import { loadBoard, loadMiniBoards, updateBoardOptimistic } from "../../store/board/board.actions"
import { Link, NavLink, useParams } from "react-router-dom"
import { utilService } from "../../services/util.service"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { CREATE_BOARD, DynamicCmp } from "../TaskCmps/DynamicCmps/DynamicCmp"
import { boardService } from "../../services/board/board.service"

export function BoardSideBar({ setViewType }) {
    const [isOpen, setIsOpen] = useState(true)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const [isAddBoard, setIsAddBoard] = useState(false)
    const boards = useSelector(storeState => storeState.boardModule.miniBoards)

    const refTrigger = useRef(null)

    useEffect(() => {
        loadMiniBoards()
    }, [])

    async function toggleStarBoard(ev, boardId) {
        ev.stopPropagation()
        ev.preventDefault()
        try {
            const fullBoard = await boardService.getById(boardId)
            updateBoardOptimistic({ ...fullBoard, isStarred: !fullBoard.isStarred }, true)
        }
        catch (err) {
            console.error(err)
        }
    }

    function onAddBoard(ev) {
        const { currentTarget } = ev
        setModalPosition(utilService.getModalPosition(currentTarget, currentTarget.getBoundingClientRect().width + 8, 0))
        setIsAddBoard(true)
    }

    function onCloseAddModal() {
        setIsAddBoard(false)
    }


    return (<>
        <div className="sidebar-container">
            {!isOpen &&
                <button className="board-sidebar-collapsed">
                    <span className="open-sidebar-btn" onClick={() => setIsOpen(true)}>{side_arrow_icon}</span>
                </button>}

            {isOpen &&
                <div className="board-sidebar">
                    <section className="board-sidebar-header">
                        <div className="workspace-letter">T</div>
                        <div className="txt-container">
                            <h2 className="workspace-title">My workspace </h2>
                            <h5 className="user-sub">Premium</h5>
                        </div>
                        <button className="close-sidebar-btn" onClick={() => setIsOpen(false)}>{side_arrow_icon}</button>
                    </section>

                    <section className="sidebar-content">
                        <div className="line">
                            {trello_icon}
                            <span>Boards</span>
                        </div>
                        <div className="line">
                            {member_icon}
                            <span>Members</span>
                            <button>{plus_icon}</button>
                        </div>
                        {/* <div className="line bolder">
                            {settings_icon}
                            <span>Workspace settings</span>
                            <button>{arrow_down}</button>
                        </div> */}
                        <div className="sep-title">
                            <h4 >Board views</h4>
                            {/* <button>{plus_icon}</button> */}
                        </div>
                        <button className="line italic" onClick={() => setViewType('board')}>
                            {board_icon}
                            <span>Board</span>
                        </button>
                        <button className="line italic" onClick={() => setViewType('table')}>
                            {table_icon}
                            <span>Table</span>
                        </button>
                        <button className="line italic">
                            {calender_icon}
                            <span>Calender</span>
                        </button>
                        <div className="sep-title">
                            <h4 >Your boards</h4>
                            <button onClick={onAddBoard} ref={refTrigger}>{plus_icon}</button>
                        </div>
                        <ul className="board-preview-list clean-list">
                            {
                                <>
                                    {boards.filter(_board => _board.isStarred).map(_board => {
                                        return <NavLink key={_board._id} className={`line board-p`} to={`/board/${_board._id}`}>
                                            <div className="board-p-img" style={{ backgroundImage: `url(${_board.style.backgroundImage})`, backgroundColor: _board.style.backgroundColor }}></div>
                                            <span>{_board.title}</span>
                                            <button className="star-container" id="star-btn">
                                                <span className="svg-container star" onClick={(ev) => toggleStarBoard(ev, _board._id)}>{star}</span>
                                                <span className="svg-container star-outline" onClick={(ev) => toggleStarBoard(ev, _board._id)}>{star_outline}</span></button>
                                        </NavLink>
                                    })}
                                    {boards.filter(_board => !_board.isStarred).map(_board => {
                                        return <NavLink key={_board._id} className={`line board-p`} to={`/board/${_board._id}`}>
                                            <div className="board-p-img" style={{ backgroundImage: `url(${_board.style.backgroundImage})`, backgroundColor: _board.style.backgroundColor }}></div>
                                            <span>{_board.title}</span>
                                            <button className="star-container-outline" id="star-btn">
                                                <span className="svg-container star-outline-o" onClick={(ev) => toggleStarBoard(ev, _board._id)}>{star_outline}</span></button>
                                        </NavLink>
                                    })}
                                </>
                            }
                        </ul>
                    </section>
                    {/* <div className="board-sidebar-footer"></div> */}
                </div>}
        </div>
        {isAddBoard && <ClickAwayListener onClickAway={onCloseAddModal}>
            <div style={{ zIndex: 110 }}>
                <DynamicCmp cmp={{ type: CREATE_BOARD }} setIsAddBoard={setIsAddBoard} refTrigger={refTrigger} offset={{ x: refTrigger.current.getBoundingClientRect().width + 8, y: 0 }} />
            </div>
        </ClickAwayListener>
        }</>
    )
}