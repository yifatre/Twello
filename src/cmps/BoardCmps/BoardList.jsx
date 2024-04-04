import { star_outline } from "../UtilCmps/SVGs"
import { BoardPreview } from "./BoardPreview"

export function BoardList({ boards }) {
    console.log(boards)
    // todo addBoard from the index
    function addBoard() {
        console.log('create')
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

                    <article className='new-board ' onClick={() => addBoard()}>
                        <p>Create new board</p>
                    </article>
                </li>
            </ul>
        </section>
    </>
    )
}