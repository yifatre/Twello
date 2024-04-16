import { useRef, useState } from "react"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

import { CREATE_BOARD, DynamicCmp } from "../TaskCmps/DynamicCmps/DynamicCmp"
import { loader, member_icon, star_outline } from "../UtilCmps/SVGs"
import { BoardPreview } from "./BoardPreview"
import { utilService } from "../../services/util.service"
import { store } from "../../store/store"
import { LOADING_DONE, LOADING_START } from "../../store/system.reducer"
import { loadBoard } from "../../store/board/board.actions"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { Loader } from "../UtilCmps/Loader"

export function BoardList({ boards }) {
    const [isAddBoard, setIsAddBoard] = useState(false)
    const refTrigger = useRef(null)
    const navigate = useNavigate()

    function onAddBoard(ev) {
        const { currentTarget } = ev
        refTrigger.current = currentTarget
        setIsAddBoard(true)
    }

    function onCloseAddModal() {
        setIsAddBoard(false)
    }

    async function onGoToBoard(boardId) {
        store.dispatch({ type: LOADING_START })
        try {
            await loadBoard(boardId)
            store.dispatch({ type: LOADING_DONE })
            console.log('loading done',)
            navigate(`/board/${boardId}`)
        }
        catch (err) {
            store.dispatch({ type: LOADING_DONE })
            console.error(err)
        }
    }

    return (<>
        {boards.filter(board => board.isStarred).length > 0 && <section className="board-list-container">
            <h3 className="flex align-center"><span>{star_outline}</span> Starred boards</h3>
            <ul className="board-list flex justify-start clean-list">
                {
                    boards.filter(board => board.isStarred).map(board => {
                        return <li className='board-preview' key={board._id} onClick={() => onGoToBoard(board._id)}>
                            <BoardPreview board={board} />
                        </li>
                    })
                }
            </ul>
        </section>}
        <section className="board-list-container">
            <h3 className="flex align-center"><span>{member_icon}</span> Your boards</h3>
            <ul className="board-list flex justify-start clean-list">
                {
                    boards.map(board => {
                        return <li className='board-preview' key={board._id} onClick={() => onGoToBoard(board._id)}>
                            <BoardPreview board={board} />
                        </li>
                    })
                }
                <li className="board-preview">

                    <article className='new-board ' onClick={(ev) => onAddBoard(ev)} ref={refTrigger}>
                        Create new board
                    </article>
                </li>
            </ul>
        </section>
        {isAddBoard && <ClickAwayListener onClickAway={onCloseAddModal}>
            <div>
                <DynamicCmp cmp={{ type: CREATE_BOARD }} setIsAddBoard={setIsAddBoard} refTrigger={refTrigger} offset={{ x: refTrigger.current.getBoundingClientRect().width + 8, y: 0 }} />
            </div>
        </ClickAwayListener>
        }
    </>
    )
}