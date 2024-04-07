import { useState } from "react"
import { CREATE_BOARD, DynamicCmp } from "../TaskCmps/DynamicCmps/DynamicCmp"
import { star_outline } from "../UtilCmps/SVGs"
import { BoardPreview } from "./BoardPreview"
import { utilService } from "../../services/util.service"

export function BoardList({ boards }) {
    const [isAddBoard, setIsAddBoard] = useState(false)

    function onAddBoard() {
        setIsAddBoard(true)
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

                    <article className='new-board ' onClick={() => onAddBoard()}>
                        <p>Create new board</p>
                        {isAddBoard && <DynamicCmp cmp={CREATE_BOARD} setIsAddBoard={setIsAddBoard} />}
                    </article>
                </li>
            </ul>
        </section>
    </>
    )
}