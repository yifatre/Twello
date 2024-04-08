export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_MINI_BOARD = 'UPDATE_MINI_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'

const initialState = {
    boards: [],
    board: null,
    lastRemovedBoard: null
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    var board

    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case REMOVE_BOARD:
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard, board: null }
            break
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD:
            board = { ...action.board }
            newState = { ...state, board }
            break
        case UPDATE_MINI_BOARD:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break

        // case UNDO_REMOVE_BOARD:
        //     if (state.lastRemovedBoard) {
        //         newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
        //     }
        //     break
        default: return state
    }
    return newState
}
