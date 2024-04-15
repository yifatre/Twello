import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadMiniBoards, removeBoard } from '../store/board/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BoardList } from '../cmps/BoardCmps/BoardList.jsx'
import { AppSideBar } from '../cmps/AppCmps/AppSideBar.jsx'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.miniBoards)

    useEffect(() => {
        loadMiniBoards()
    }, [])

    return (
        <div className='board-index'>
            <main>
                <AppSideBar />
                <div className='all-boards'>
                    <BoardList boards={boards} />
                </div>
            </main>
        </div>
    )
}