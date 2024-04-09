import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BoardList } from '../cmps/BoardCmps/BoardList.jsx'
import { AppSideBar } from '../cmps/AppCmps/AppSideBar.jsx'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    return (
        <div className='board-index'>
            <AppSideBar/>
            <main>
                <BoardList boards={boards}/>
            </main>
        </div>
    )
}