import { Outlet, useParams } from "react-router"
import { GroupList } from "../GroupCmps/GroupList"
import { useEffect, useState } from "react"

import { showErrorMsg } from "../../services/event-bus.service"
import { BoardHeader } from "./BoardHeader"
import { BoardSideBar } from "./BoardSideBar"
import { boardService } from "../../services/board/board.service.local"
import { loadBoards, updateBoard } from "../../store/board/board.actions"
import { useSelector } from "react-redux"

export function BoardDetails() {
    const { boardId } = useParams()
    const [board, setBoard] = useState(null)
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoard()
    }, [])

    useEffect(() => {
        setBoard(boards[boards.findIndex(board => board._id === boardId)])
        console.log('loading board');
    }, [boards])

    async function loadBoard() {
        try {
            console.log(boardId)
            await loadBoards()
        }
        catch (err) {
            console.error(err)
            showErrorMsg('Cannot remove board')
        }
    }

    function onUpdateBoard(groupId, taskToUpdate) {
        const boardToUpdate = board.groups.map(group => {
            if (group.id === groupId) {
                const updatedTasks = group.tasks.map(task => {
                    if (task.id === taskToUpdate.id) {
                        return taskToUpdate
                    }
                    return task
                })
                return { ...group, tasks: updatedTasks }
            }
            return group
        })
        updateBoard(boardToUpdate)
    }
 
    function onUpdateTask(cmp, info, task ) {
        //todo info:{groupId,taskId,dynamic}
        var groupId = info.groupId
        var taskToUpdate
        switch (cmp) {
            case LABELS:
                taskToUpdate = {...task, labelIds:info.dynamic}
                break

            case MEMBERS:
                taskToUpdate = {...task, memberIds:info.membersIds}
                break

            case DATES:
                taskToUpdate = {...task, date:info.date}
                break

            case ATTACHMENT:
                taskToUpdate = {...task, attach:info.attach}
                break

            case COVER:
                taskToUpdate = {...task, cover:info.cover}
                break

        }
        return onUpdateBoard(groupId, taskToUpdate)
    }


    if (!board) return <div>loading</div>
    return (<>
        <section className="board-details" style={{ backgroundImage: `url(${board.style?.backgroundImage})` }}>
            <BoardHeader board={board}/>
            <BoardSideBar/>
            <GroupList groups={board.groups} board={board}/>
            <div className="board-fade"></div>
        </section>
        <Outlet context={[board,onUpdateTask]} />
    </>
    )
}