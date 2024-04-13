
import { storageService } from '../async-storage.service.js'
import { utilService } from '../util.service.js'
import { userService } from '../user.service.js'
import { boardsDemoData, boardsDemoData2 } from '../demo-data.js'

const STORAGE_KEY = 'boardDB'
_createBoards()
export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getEmptyTask,
    getActivity,
    getEmptyGroup,
    getEmptyLabel,
    getEmptyTodo
}
window.cs = boardService


async function query(filterBy = { txt: '', price: 0 }) {
    var boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }

    return boards.map(board => ({ _id: board._id, title: board.title, style: { backgroundImage: board.style?.backgroundImage }, isStarred: board.isStarred }))
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    console.log('board', board)
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.createdBy = userService.getLoggedInUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        title: "",
        isStarred: false,
        archivedAt: null,
        createdById: "u101",
        style: {
            background: null,
            backgroundImage: "https://images.unsplash.com/photo-1568607689150-17e625c1586e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        labels: [],
        members: [],
        groups: [
            {
                id: utilService.makeId('g'),
                title: 'To do',
                isExtended: true,
                style: { themeColor: 'neutral' },
                tasks: []
            },
            {
                id: utilService.makeId('g'),
                title: 'Doing',
                isExtended: true,
                style: { themeColor: 'gray' },
                tasks: []
            },
            {
                id: utilService.makeId('g'),
                title: 'Done',
                isExtended: true,
                style: { themeColor: 'gray' },
                tasks: []
            }
        ],
        activities: [],
    }
}

function getEmptyGroup() {
    return {
        title: '',
        isExtended: true,
        style: {
            backgroundColor: 'gray'
        },
        tasks: []
    }
}

function getEmptyTask() {
    return {
        title: '',
        description: '',
        style: {

        },
        labelIds: [],
        memberIds: [],
        checklists: [],
    }
}

function getEmptyTodo() {
    return {
        title: '',
        isDone: false,
    }
}

function getActivity(txt, byMemberId, group, task) {
   const miniGroup = group ?{ id: group.id, title: group.title }:{}
   const miniTask = task ?{ id: task.id, title: task.title }:{}
     
    return {
        id: utilService.makeId('a'),
        createdAt: Date.now(),
        txt,
        byMemberId,
        group: miniGroup,
        task: miniTask,
    }
}

function getEmptyLabel() {
    return {
        id: utilService.makeId('l'),
        title: '',
        color: 'green-subtle'
    }
}

function _createBoards() {
    const boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards) utilService.saveToStorage(STORAGE_KEY, boardsDemoData2)
}

