import { useParams } from "react-router"
import { GroupList } from "../GroupCmps/GroupList"
import { useEffect, useState } from "react"
import { boardService } from "../../services/board.service.local"
import { showErrorMsg } from "../../services/event-bus.service"

export function BoardDetails() {
    const { boardId } = useParams()
    const [board, setBoard] = useState(null)

    useEffect(() => {
        loadBoard()
    }, [])

    async function loadBoard() {
        try {
            console.log(boardId);
            setBoard(await boardService.getById(boardId))
        }
        catch (err) {
            console.error(err)
            showErrorMsg('Cannot remove board')
        }
    }
    
    if (!board) return <div>loading</div>
    return (
        <GroupList groups={board.groups} />
    )
}