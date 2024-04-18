
// import { storageService } from './async-storage.service.js'
import { httpService } from '../http.service.js'
import { userServiceHttp } from '../user.service.js'
import { utilService } from '../util.service.js'


export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg,
    getEmptyGroup,
    getEmptyTask,
    getEmptyTodo,
    getActivity,
    getEmptyLabel,
    getEmptyFilter
}
window.cs = boardService


async function query(filterBy = {}) {
    return httpService.get('board', filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)

    } else {
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
    return savedMsg
}

function getEmptyBoard() {
    return {
        title: "",
        isStarred: false,
        archivedAt: null,
        createdById: userServiceHttp.getLoggedinUser()._id,
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
    const miniGroup = group ? { id: group.id, title: group.title } : {}
    const miniTask = task ? { id: task.id, title: task.title } : {}
    let byMember = userServiceHttp.getLoggedinUser()._id
    if (!byMember) {
        byMember = 0
    }
    return {
        id: utilService.makeId('a'),
        createdAt: Date.now(),
        txt,
        byMemberId: byMember,
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

function getEmptyFilter() {
    return {
        filterBy: '',
        membersIds: []
    }
}

export const gradients = ['https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335505/ice_rsnbxk.svg',
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335505/wave_xw5hqz.svg',
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335506/magic_mzdtqi.svg',
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335505/rainbow_qqs5to.svg',
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335506/peach_wmp38h.svg', 
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335505/flower_knqi1i.svg',
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335505/earth_f3kb9g.svg',
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335505/alien_qniwed.svg',
    'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713335506/lava_mik3vn.svg']