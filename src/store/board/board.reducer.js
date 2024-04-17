
export const SET_MINI_BOARDS = 'SET_MINI_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_MINI_BOARD = 'ADD_MINI_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_MINI_BOARD = 'UPDATE_MINI_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const UNDO_UPDATE_BOARD = 'UNDO_UPDATE_BOARD'
export const UNDO_UPDATE_MINI_BOARDS = 'UNDO_UPDATE_BOARDS'

const initialState = {
    miniBoards: [],
    board: null,
    lastUpdatedBoard: null,
    lastUpdatedMiniBoards: null,
    lastRemovedBoard: null
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var miniBoards
    var board

    switch (action.type) {
        case SET_MINI_BOARDS:
            newState = { ...state, miniBoards: action.miniBoards }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case REMOVE_BOARD:
            const lastRemovedBoard = state.miniBoards.find(board => board._id === action.boardId)
            miniBoards = state.miniBoards.filter(board => board._id !== action.boardId)
            newState = { ...state, miniBoards, lastRemovedBoard, board: null }
            break
        case ADD_MINI_BOARD:
            newState = { ...state, miniBoards: [...state.miniBoards, action.board] }
            break
        case UPDATE_BOARD:
            const lastUpdatedBoard = structuredClone(state.board)
            board = { ...action.board }
            newState = { ...state, board, lastUpdatedBoard: {...lastUpdatedBoard} }
            break
        case UPDATE_MINI_BOARD:
            const lastUpdatedMiniBoards = {...state.miniBoards}
            miniBoards = state.miniBoards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, miniBoards, lastUpdatedMiniBoards: lastUpdatedMiniBoards }
            break

        case UNDO_UPDATE_BOARD:
            if (state.lastUpdatedBoard) {
                newState = { ...state, board: state.lastUpdatedBoard }
            }
            break
        case UNDO_UPDATE_MINI_BOARDS:
            if (state.lastUpdatedMiniBoards) {
                newState = { ...state, miniBoards: state.lastUpdatedMiniBoards }
            }
            break
        case UNDO_REMOVE_BOARD:
            if (state.lastRemovedBoard) {
                newState = { ...state, miniBoards: [...state.miniBoards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break
        default: return state
    }
    return newState
}
