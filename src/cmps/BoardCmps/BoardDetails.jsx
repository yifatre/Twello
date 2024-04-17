import { Outlet, useParams } from "react-router"
import { GroupList } from "../GroupCmps/GroupList"
import { useEffect, useState } from "react"

import { BoardHeader } from "./BoardHeader"
import { BoardSideBar } from "./BoardSideBar"
import { loadBoard, updateBoardOptimistic } from "../../store/board/board.actions"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { BoardRightSideBar } from "./BoardRightSideBar"
import { BoardTable } from "./BaordTable"
import { boardService } from "../../services/board/board.service"

export function BoardDetails() {
    const { boardId } = useParams()
    const [rsbIsOpen, setRsbIsOpen] = useState(false)
    const [viewType, setViewType] = useState('board')
    const board = useSelector(storeState => storeState.boardModule.board)
    const [boardFilter, setBoardFilter] = useState('')


    useEffect(() => {
        getBoard()
    }, [boardId])


    async function getBoard() {
        try {
            await loadBoard(boardId)
        }
        catch (err) {
            console.error(err)
        }
    }

    async function saveTask(task, groupId, activity) {
        // console.log("activity", activity)
        const group = board.groups.find(group => group.id === groupId)
        // console.log(group)
        if (task.id) {
            // const idx = group.tasks.findIndex(_task => _task.id === task.id)
            // group.tasks[idx] = task
            const tasks = group.tasks.map(_task => _task.id !== task.id ? _task : task)
            return await saveGroup({ ...group, tasks }, activity)
        } else {
            task.id = utilService.makeId('t')
            // group.tasks.push(task)

            //todo add the member !!! now its 0 for development
            const newActivity = boardService.getActivity(`added ${task.title} to ${group.title}`, 0, group, task)
            return await saveGroup({ ...group, tasks: [...group.tasks, task] }, newActivity)
        }
    }

    function removeTask(taskId, groupId) {
        let group = board.groups.find(group => group.id === groupId)
        // group = group.tasks.filter(task => task.id !== taskId)
        //todo when connected need to get group and task for the activity
        //todo add the member !!! now its 0 for development
        console.log('group', group)
        const activity = boardService.getActivity('deleted ', 0, group, taskId)
        saveGroup({ ...group, tasks: group.tasks.filter(task => task.id !== taskId) }, activity)
    }

    async function saveGroup(group, activity) {
        if (group.id) {
            // const idx = board.groups.findIndex(_group => _group.id === group.id)
            // board.groups[idx] = group
            const groups = board.groups.map(_group => _group.id !== group.id ? _group : group)
            if (activity) board.activities.unshift(activity)
            return await updateBoardOptimistic({ ...board, groups })
        } else {
            group.id = utilService.makeId('g')
            // board.groups.push(group)
            //todo add the member !!! now its 0 for development
            board.activities.unshift(boardService.getActivity(`added ${group.title} to this board`, 0, group))
            return await updateBoardOptimistic({ ...board, groups: [...board.groups, group] })
        }
    }

    function removeGroup(groupId) {
        updateBoardOptimistic({ ...board, groups: board.groups.filter(group => group.id !== groupId) })
    }

    function onDragEnd(result) {
        // console.log('result', result)
        if (!result.destination) {
            return
        }

        const { groups } = board

        const startIdx = result.source.index
        const endIdx = result.destination.index

        if (result.type === 'group') {
            const [group] = groups.splice(startIdx, 1)
            groups.splice(endIdx, 0, group)
            updateBoardOptimistic({ ...board, groups })
        }

        if (result.type === 'task') {
            const groupStart = groups.find(group => group.id === result.source.droppableId)
            const groupEnd = groups.find(group => group.id === result.destination.droppableId)
            const [task] = groupStart.tasks.splice(startIdx, 1)
            groupEnd.tasks.splice(endIdx, 0, task)
            updateBoardOptimistic({ ...board, groups })
        }
    }

    // if (!board) return <div>loading</div>
    return (<>
        <section className={`board-details ${rsbIsOpen ? 'rsb-open' : ''}`} style={{ backgroundImage: `url(${board.style?.backgroundImage})` }}>
            <BoardHeader setBoardFilter={setBoardFilter} board={board} setRsbIsOpen={setRsbIsOpen} setViewType={setViewType} viewType={viewType} />
            <BoardSideBar setViewType={setViewType} />
            {viewType === 'board' && <GroupList boardFilter={boardFilter} board={board} saveGroup={saveGroup} removeGroup={removeGroup} saveTask={saveTask} removeTask={removeTask} onDragEnd={onDragEnd} />}
            {viewType === 'table' && <BoardTable board={board} saveGroup={saveGroup} removeGroup={removeGroup} saveTask={saveTask} removeTask={removeTask} onDragEnd={onDragEnd} />}
            <div className="board-fade"></div>
            <BoardRightSideBar setRsbIsOpen={setRsbIsOpen} />
        </section>
        <Outlet context={[saveTask]} />
    </>
    )
}