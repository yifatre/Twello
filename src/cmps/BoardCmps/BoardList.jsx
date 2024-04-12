import { useRef, useState } from "react"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

import { CREATE_BOARD, DynamicCmp } from "../TaskCmps/DynamicCmps/DynamicCmp"
import { star_outline } from "../UtilCmps/SVGs"
import { BoardPreview } from "./BoardPreview"
import { utilService } from "../../services/util.service"

export function BoardList({ boards }) {
    const [isAddBoard, setIsAddBoard] = useState(false)
    const refTrigger = useRef(null)

    function onAddBoard(ev) {
        const { currentTarget } = ev
        refTrigger.current = currentTarget
        setIsAddBoard(true)
    }

    function onCloseAddModal() {
        setIsAddBoard(false)
    }

    return (<>
        {boards.filter(board => board.isStarred).length > 0 && <section className="board-list-container">
            <h3 className="flex align-center"><span>{star_outline}</span> Starred boards</h3>
            <ul className="board-list flex justify-start clean-list">
                {
                    boards.filter(board => board.isStarred).map(board => {
                        return <li key={board._id}>
                            <BoardPreview board={board} />
                        </li>
                    })
                }
            </ul>
        </section>}
        <section className="board-list-container">
            <h3 className="flex align-center">Your boards</h3>
            <ul className="board-list flex justify-start clean-list">
                {
                    boards.map(board => {
                        return <li key={board._id}>
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
                <DynamicCmp cmp={CREATE_BOARD} setIsAddBoard={setIsAddBoard} refTrigger={refTrigger} offset={{ x: refTrigger.current.getBoundingClientRect().width + 8, y: 0 }} />
            </div>
        </ClickAwayListener>
        }
    </>
    )
}