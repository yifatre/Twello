
import { storageService } from '../async-storage.service.js'
import { utilService } from '../util.service.js'
import { userService } from '../user.service.js'
import { boardsDemoData } from '../demo-data.js'

const STORAGE_KEY = 'boardDB'
_createBoards()
export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getEmptyTask,
    getEmptyActivity,
    getEmptyGroup
}
window.cs = boardService


async function query(filterBy = { txt: '', price: 0 }) {
    var boards = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    }
    if (filterBy.price) {
        boards = boards.filter(board => board.price <= filterBy.price)
    }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
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
        },
        labels: [],
        members: [],
        groups: [
            {
                id: utilService.makeId('g'),
                title: 'todo',
                isExtended: true,
                style: {themeColor : 'gray'}
            },
            {
                id: utilService.makeId('g'),
                title: 'todo',
                isExtended: true,
                style: {themeColor : 'gray'}
            },
            {
                id: utilService.makeId('g'),
                title: 'todo',
                isExtended: true,
                style: {themeColor : 'gray'}
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
            backgroundColor : 'gray'
        },
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

function getEmptyActivity() {
    return {
        id: utilService.makeId('a'),
        createdAt: Date.now(),
        txt: '',
        byMemberId: '',
        group: {},
        task: {},
    }
}

function _createBoards() {
    const boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards) utilService.saveToStorage(STORAGE_KEY, boardsDemoData)
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




