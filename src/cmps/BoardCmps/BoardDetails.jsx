import { Outlet, useParams } from "react-router"
import { GroupList } from "../GroupCmps/GroupList"
import { useEffect, useState } from "react"

import { BoardHeader } from "./BoardHeader"
import { BoardSideBar } from "./BoardSideBar"
import { loadBoard, loadBoards, updateBoard } from "../../store/board/board.actions"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { BoardRightSideBar } from "./BoardRightSideBar"
import { BoardTable } from "./BaordTable"
import { boardService } from "../../services/board/board.service.local"

export function BoardDetails() {
    const { boardId } = useParams()
    const [rsbIsOpen, setRsbIsOpen] = useState(false)
    const [viewType, setViewType] = useState('board')
    const board = useSelector(storeState => storeState.boardModule.board)

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

    async function saveTask(task, groupId,activity) {
        console.log("activity", activity)
        const group = board.groups.find(group => group.id === groupId)
        console.log(group);
        if (task.id) {
            const idx = group.tasks.findIndex(_task => _task.id === task.id)
            group.tasks[idx] = task
            return await saveGroup(group,activity)
        } else {
            task.id = utilService.makeId('t')
            group.tasks.push(task)
             //todo add the member !!! now its 0 for development
            const newActivity = boardService.getActivity(`added ${task.title} to ${group.title}`,0,group,task)
            return await saveGroup(group,newActivity)
        }
    }

    function removeTask(taskId, groupId) {
        let group = board.groups.find(group => group.id === groupId)
        group = group.tasks.filter(task => task.id !== taskId)
        //todo when connected need to get group and task for the activity
         //todo add the member !!! now its 0 for development
        const activity = boardService.getActivity('archived ',0,group,task)
        saveGroup(group,activity)
    }

    async function saveGroup(group,activity) {
        if (group.id) {
            const idx = board.groups.findIndex(_group => _group.id === group.id)
            board.groups[idx] = group
           if(activity)board.activities.unshift(activity)
            return await updateBoard(board)
        } else {
            group.id = utilService.makeId('g')
            board.groups.push(group)
             //todo add the member !!! now its 0 for development
            board.activities.unshift(boardService.getActivity(`added ${group.title} to this board`,0,group))
            return await updateBoard(board)
        }
    }

    function removeGroup(groupId) {
        const board = board.groups.filter(group => group.id !== groupId)
        updateBoard(board)
    }

    if (!board) return <div>loading</div>
    return (<>
        <section className={`board-details ${rsbIsOpen ? 'rsb-open' : ''}`} style={{ backgroundImage: `url(${board.style?.backgroundImage})` }}>
            <BoardHeader board={board} setRsbIsOpen={setRsbIsOpen} setViewType={setViewType} viewType={viewType}/>
            <BoardSideBar setViewType={setViewType}/>
            {viewType === 'board' && <GroupList board={board} saveGroup={saveGroup} removeGroup={removeGroup} saveTask={saveTask} removeTask={removeTask} />}
            {viewType === 'table' &&  <BoardTable/>}
            <div className="board-fade"></div>
             <BoardRightSideBar setRsbIsOpen={setRsbIsOpen} />
        </section>
        <Outlet context={[saveTask]} />
    </>
    )
}