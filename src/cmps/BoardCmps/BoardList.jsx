import { BoardPreview } from "./BoardPreview"

export function BoardList({ boards }) {
    return (<>
        <div>im lis</div>
        {
            boards.map(board => {
               <BoardPreview board={board}/>
            })
        }
    </>
    )
}