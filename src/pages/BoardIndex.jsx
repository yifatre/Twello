import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.js'
import { BoardList } from '../cmps/BoardCmps/BoardList.jsx'

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
            <h3>Boards App</h3>
                <button onClick={onAddBoard}>Add Board</button>
            <main>
                <BoardList boards={boards}/>
            </main>
        </div>
    )
}