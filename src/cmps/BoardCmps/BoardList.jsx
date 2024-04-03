import { BoardPreview } from "./BoardPreview"

export function BoardList({ boards }) {
    console.log(boards);
    return (<>
        <div>im lis</div>
        {
            boards.map(board => {
               return <BoardPreview key={board._id} board={board}/>
            })
        }
    </>
    )
}