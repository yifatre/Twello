import { useState } from "react"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

import { CREATE_BOARD, DynamicCmp } from "../TaskCmps/DynamicCmps/DynamicCmp"
import { star_outline } from "../UtilCmps/SVGs"
import { BoardPreview } from "./BoardPreview"
import { utilService } from "../../services/util.service"

export function BoardList({ boards }) {
    const [isAddBoard, setIsAddBoard] = useState(false)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    // console.log(boards)

    function onAddBoard(ev) {
        console.log('ev', ev)
        const { currentTarget } = ev
        console.log('currentTarget', currentTarget)
        setModalPosition(utilService.getModalPosition(currentTarget, currentTarget.getBoundingClientRect().width + 8, 0))
        setIsAddBoard(true)
    }

    function onCloseAddModal() {
        setIsAddBoard(false)
    }

    return (<>
        <section className="board-list-container">
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
        </section>
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

                    <article className='new-board ' onClick={(ev) => onAddBoard(ev)}>
                        Create new board
                    </article>
                </li>
            </ul>
        </section>
        {isAddBoard && <ClickAwayListener onClickAway={onCloseAddModal}>
            <div>
                <DynamicCmp cmp={CREATE_BOARD} setIsAddBoard={setIsAddBoard} position={modalPosition} />
            </div>
        </ClickAwayListener>
        }
    </>
    )
}