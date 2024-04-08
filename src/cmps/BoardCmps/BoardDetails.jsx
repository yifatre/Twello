import { Outlet, useParams } from "react-router"
import { GroupList } from "../GroupCmps/GroupList"
import { useEffect, useState } from "react"

import { showErrorMsg } from "../../services/event-bus.service"
import { BoardHeader } from "./BoardHeader"
import { BoardSideBar } from "./BoardSideBar"
import { boardService } from "../../services/board/board.service.local"
import { loadBoard, loadBoards, updateBoard } from "../../store/board/board.actions"
import { useSelector } from "react-redux"
import { ATTACHMENT, COVER, DATES, LABELS, MEMBERS } from "../TaskCmps/DynamicCmps/DynamicCmp"
import { utilService } from "../../services/util.service"

export function BoardDetails() {
    const { boardId } = useParams()
    // const [board, setBoard] = useState(null)

    const board = useSelector(storeState => storeState.boardModule.board)

    useEffect(() => {
        getBoard()
    }, [])

    // useEffect(() => {
    //     setBoard(boards[boards.findIndex(board => board._id === boardId)])
    // }, [board])

    async function getBoard() {
        try {
            await loadBoard(boardId)
        }
        catch (err) {
            console.error(err)
            // showErrorMsg('Cannot remove board')
        }
    }

    function saveTask(task, groupId) {
        const group = board.groups.find(group => group.id === groupId)
        if (task.id) {
            const idx = group.tasks.findIndex(_task => _task.id === task.id)
            group.tasks[idx] = task
            saveGroup(group)
        } else {
            task.id = utilService.makeId('t')
            group.tasks.push(task)
            saveGroup(group)
        }
    }

    function removeTask(taskId, groupId) {
        let group = board.groups.find(group => group.id === groupId)
        group = group.tasks.filter(task => task.id !== taskId)
        saveGroup(group)
    }

    function saveGroup(group) {
        if (group.id) {
            const idx = board.groups.findIndex(_group => _group.id === group.id)
            board.groups[idx] = group
            updateBoard(board)
        } else {
            group.id = utilService.makeId('g')
            board.groups.push(group)
            updateBoard(board)
        }
    }

    function removeGroup(groupId) {
        const board = board.groups.filter(group => group.id !== groupId)
        updateBoard(board)
    }

    // function onUpdateTask(cmp, info, task) {
    //     //todo info:{groupId,taskId,dynamic}
    //     var groupId = info.groupId
    //     var taskToUpdate
    //     switch (cmp) {
    //         case LABELS:
    //             taskToUpdate = { ...task, labelIds: info.dynamic }
    //             // console.log('taskToUpdate:', taskToUpdate)
    //             break

    //         case MEMBERS:
    //             taskToUpdate = { ...task, memberIds: info.dynamic }
    //             // console.log('taskToUpdate', taskToUpdate)
    //             break

    //         case DATES:
    //             taskToUpdate = { ...task, date: info.date }
    //             break

    //         case ATTACHMENT:
    //             taskToUpdate = { ...task, attach: info.attach }
    //             break

    //         case COVER:
    //             taskToUpdate = { ...task, cover: info.cover }
    //             break
    //     }
    //     const groupToUpdate = board.groups.find(group => group.id === groupId)
    //     return saveTask(taskToUpdate, groupToUpdate)
    // }


    if (!board) return <div>loading</div>
    return (<>
        <section className="board-details" style={{ backgroundImage: `url(${board.style?.backgroundImage})` }}>
            <BoardHeader board={board} />
            <BoardSideBar />
            <GroupList board={board} saveGroup={saveGroup} removeGroup={removeGroup} saveTask={saveTask} removeTask={removeTask} />
            <div className="board-fade"></div>
        </section>
        <Outlet context={[saveTask]} />
    </>
    )
}