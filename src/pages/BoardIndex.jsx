import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BoardList } from '../cmps/BoardCmps/BoardList.jsx'
import { boardService } from '../services/board/board.service.local.js'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')            
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard() {
        const board = boardService.getEmptyBoard()
             
    }

    async function onUpdateBoard(board) {
             
    }



    return (
        <div>
            <main>
                <BoardList boards={boards}/>
            </main>
        </div>
    )
}