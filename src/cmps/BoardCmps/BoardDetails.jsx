import { Outlet, useParams } from "react-router"
import { GroupList } from "../GroupCmps/GroupList"
import { useEffect, useState } from "react"
import { boardService } from "../../services/board.service.local"
import { showErrorMsg } from "../../services/event-bus.service"
import { BoardHeader } from "./BoardHeader"
import { BoardSideBar } from "./BoardSideBar"
import { ATTACHMENT, COVER, DATES, LABELS, MEMBERS } from "../TaskCmps/DynamicCmps/DynamicCmp"

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

    function onUpdateBoard(groupId, taskToUpdate) {
        const boardToUpdate = board.groups.map(group => {
            if (group.id === groupId) {
                const updatedTasks = group.tasks.map(task => {
                    if (task.id === taskToUpdate.id) {
                        console.log('task from map:',task);
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
                console.log('taskToUpdate:',taskToUpdate);
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
        <section className="board-details" style={{ backgroundImage: `url(${board.style.backgroundImage})` }}>
            <BoardHeader board={board}/>
            <BoardSideBar/>
            <GroupList groups={board.groups} board={board}/>
            <div className="board-fade"></div>
        </section>
        <Outlet context={[board]} />
    </>
    )
}