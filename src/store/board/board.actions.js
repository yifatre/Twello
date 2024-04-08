import { boardService } from '../../services/board/board.service.local.js'
// import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, UPDATE_MINI_BOARD } from './board.reducer.js'

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        console.log('Boards from DB:', boards)
        store.dispatch({
            type: SET_BOARDS,
            boards
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
        store.dispatch({ type: ADD_BOARD, board: { _id: board._id, title: board.title, style: { backgroundImage: board.style.backgroundImage }, isStarred: board.isStarred } })
        store.dispatch({ type: SET, board })
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board, isUpdateMiniBoard = false) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        store.dispatch({ type: UPDATE_BOARD, board })
        if (isUpdateMiniBoard) store.dispatch({ type: UPDATE_MINI_BOARD, board: { _id: board._id, title: board.title, style: { backgroundImage: board.style?.backgroundImage }, isStarred: board.isStarred } })
        return savedBoard
    }
    catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
    store.dispatch({
        type: REMOVE_BOARD,
        boardId
    })
    showSuccessMsg('Board removed')

    boardService.remove(boardId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully')
        })
        .catch(err => {
            showErrorMsg('Cannot remove board')
            console.log('Cannot load boards', err)
            store.dispatch({
                type: UNDO_REMOVE_BOARD,
            })
        })
}
