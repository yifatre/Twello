import { Outlet, useParams } from "react-router"
import { GroupList } from "../GroupCmps/GroupList"
import { useEffect, useState } from "react"

import { showErrorMsg } from "../../services/event-bus.service"
import { BoardHeader } from "./BoardHeader"
import { BoardSideBar } from "./BoardSideBar"
import { boardService } from "../../services/board/board.service.local"

export function BoardDetails() {
    const { boardId } = useParams()
    const [board, setBoard] = useState(null)

    useEffect(() => {
        loadBoard()
    }, [])

    async function loadBoard() {
        try {
            console.log(boardId)
            setBoard(await boardService.getById(boardId))
        }
        catch (err) {
            console.error(err)
            showErrorMsg('Cannot remove board')
        }
    }

    if (!board) return <div>loading</div>
    return (<>
        <section className="board-details" style={{ backgroundImage: `url(${board.style?.backgroundImage})` }}>
            <BoardHeader board={board}/>
            <BoardSideBar/>
            <GroupList groups={board.groups} board={board}/>
            <div className="board-fade"></div>
        </section>
        <Outlet context={[board]} />
    </>
    )
}