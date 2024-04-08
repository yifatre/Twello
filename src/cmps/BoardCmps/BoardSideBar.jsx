import { useEffect, useState } from "react"
import { arrow_down, calender_icon, member_icon, plus_icon, settings_icon, side_arrow_icon, star, star_outline, table_icon, trello_icon } from "../UtilCmps/SVGs"
import { useSelector } from "react-redux"
import { loadBoard, loadBoards, updateBoard } from "../../store/board/board.actions"
import { Link, NavLink, useParams } from "react-router-dom"

export function BoardSideBar() {
    const [isOpen, setIsOpen] = useState(true)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const board = useSelector(storeState => storeState.boardModule.board)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoards()
    }, [])

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    function setStarBoard(boardId) {

        // updateBoard({...board})
    }

    return (
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
                            <h2 className="workspace-title">My workspace</h2>
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
                        <div className="line bolder">
                            {settings_icon}
                            <span>Workspace settings</span>
                            <button>{arrow_down}</button>
                        </div>
                        <div className="sep-title">
                            <h4 >Workspace views</h4>
                            <button>{plus_icon}</button>
                        </div>
                        <div className="line italic">
                            {table_icon}
                            <span>Table</span>
                        </div>
                        <div className="line italic">
                            {calender_icon}
                            <span>Calender</span>
                        </div>
                        <div className="sep-title">
                            <h4 >Your boards</h4>
                            <button>{plus_icon}</button>
                        </div>
                        <ul className="board-preview-list clean-list">
                            {
                                <>
                                    {boards.filter(_board => _board.isStarred).map(_board => {
                                        return <NavLink key={_board._id} className={`line board-p`} to={`/board/${_board._id}`}>
                                            <div className="board-p-img" style={{ backgroundImage: `url(${_board.backgroundImage})`, backgroundColor: _board.backgroundColor }}></div>
                                            <span>{_board.title}</span>
                                            <button className="star-container">
                                                <span className="svg-container star" onClick={() => setStarBoard(_board._id)}>{star}</span>
                                                <span className="svg-container star-outline" onClick={() => setStarBoard(_board._id)}>{star_outline}</span></button>
                                        </NavLink>
                                    })}
                                    {boards.filter(_board => !_board.isStarred).map(_board => {
                                        return <NavLink key={_board._id} className={`line board-p`} to={`/board/${_board._id}`}>
                                            <div className="board-p-img" style={{ backgroundImage: `url(${_board.backgroundImage})`, backgroundColor: _board.backgroundColor }}></div>
                                            <span>{_board.title}</span>
                                            <button className="star-container-outline">
                                                <span className="svg-container star-outline-o" onClick={() => setStarBoard(_board._id)}>{star_outline}</span></button>
                                        </NavLink>
                                    })}
                                </>
                            }
                        </ul>
                    </section>
                        <div className="board-sidebar-footer"></div>
                </div>}
        </div>
    )
}