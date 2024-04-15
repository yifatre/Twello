import { boardService } from '../../services/board/board.service.local.js'
// import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_MINI_BOARD, REMOVE_BOARD, SET_BOARD, SET_MINI_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, UPDATE_MINI_BOARD, UNDO_UPDATE_BOARD, UNDO_UPDATE_MINI_BOARDS } from './board.reducer.js'

export async function loadMiniBoards() {
    try {
        const miniBoards = await boardService.query()
        console.log('Boards from DB:', miniBoards)
        store.dispatch({
            type: SET_MINI_BOARDS,
            miniBoards
        })
        console.log('loading boards')
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        console.log('Boards from DB:', board)
        store.dispatch({
            type: SET_BOARD,
            board
        })
        console.log('loading board')
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch({ type: ADD_MINI_BOARD, board: { _id: savedBoard._id, title: savedBoard.title, style: { backgroundImage: savedBoard.style.backgroundImage }, isStarred: savedBoard.isStarred } })
        store.dispatch({ type: SET_BOARD, savedBoard })
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

// export async function updateBoard(board, isUpdateMiniBoard = false) {
//     try {
//         const savedBoard = await boardService.save(board)
//         console.log('Updated Board:', savedBoard)
//         store.dispatch({ type: UPDATE_BOARD, board })
//         if (isUpdateMiniBoard) store.dispatch({ type: UPDATE_MINI_BOARD, board: { _id: board._id, title: board.title, style: { backgroundImage: board.style?.backgroundImage }, isStarred: board.isStarred } })
//         return savedBoard
//     }
//     catch (err) {
//         console.log('Cannot save board', err)
//         throw err
//     }
// }

export async function updateBoardOptimistic(board, isUpdateMiniBoard = false) {
    store.dispatch({
        type: UPDATE_BOARD,
        board
    })
    try {
        if (isUpdateMiniBoard) store.dispatch({ type: UPDATE_MINI_BOARD, board: { _id: board._id, title: board.title, style: { backgroundImage: board.style?.backgroundImage }, isStarred: board.isStarred } })
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        return savedBoard
    }
    catch (err) {
        console.log('optimistic', err)

        store.dispatch({
            type: UNDO_UPDATE_BOARD,
        })
        store.dispatch({
            type: UNDO_UPDATE_MINI_BOARDS,
        })
        throw err
    }
}

export async function onRemoveBoardOptimistic(boardId) {

    try {
        store.dispatch({
            type: REMOVE_BOARD,
            boardId
        })
        await boardService.remove(boardId)
        console.log('Server Reported - Deleted Successfully')

    }
    catch (err) {
        console.log('Cannot delete board', err)
        store.dispatch({
            type: UNDO_REMOVE_BOARD,
        })
    }

}
