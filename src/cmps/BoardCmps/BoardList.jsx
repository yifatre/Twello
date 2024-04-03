import { BoardPreview } from "./BoardPreview"

export function BoardList({ boards }) {
    console.log(boards);
    return (
        <section className="board-list-container">
            <ul className="board-list flex justify-center">
                {
                    boards.map(board => {
                        return <li key={board._id}>
                            <BoardPreview  board={board} />
                        </li>

                    })
                }
            </ul>
        </section>
    )
}