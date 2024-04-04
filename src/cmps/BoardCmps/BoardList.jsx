import { BoardPreview } from "./BoardPreview"

export function BoardList({ boards }) {
    console.log(boards);
    // todo addBoard from the index
    function addBoard(){
        console.log('create');
    }
    return (
        <section className="board-list-container">
            <ul className="board-list flex justify-center">
                {
                    boards.map(board => {
                        return <li key={board._id}>
                            <BoardPreview board={board} />
                        </li>

                    })
                }
                <li className="board-preview">

                    <article className='new-board ' onClick={()=> addBoard()}>
                        <p>Create new board</p>
                    </article>
                </li>
            </ul>
        </section>
    )
}