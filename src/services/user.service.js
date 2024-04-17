import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userServiceHttp = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    getUsers,
    getGuestUser
}


async function login({ email, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { email, password })
        return _setLoggedinUser(user)
    }
    catch (err) {
        return 'Invalid login' + err
    }
}

async function signup({ username, password, fullName, email }) {
    try {
        const userToSingUp = { username, password, fullName, email, isAdmin: false }
        const user = await httpService.post(BASE_URL + 'signup', userToSingUp)
        return _setLoggedinUser(user)
    }
    catch (err) {
        return 'Invalid signup' + err
    }
}


async function logout() {

    try {
        const user = await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    }
    catch (err) {
        return 'couldnt logout' + err
    }
}

function getById(userId) {
    return httpService.get('user/' + userId)
}

function getLoggedinUser() {
    const loggedinUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    if (loggedinUser) return loggedinUser
    else return getGuestUser()
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id, fullName: user.fullName, imgUrl: user.
            imgUrl, isAdmin: user.isAdmin || ''
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullName: ''

    }
}

async function getUsers() {
    return await httpService.get(`user`)
}

function getGuestUser() {
    return {
        _id: 'u107',
        fullName: 'Guest',
        imgUrl: 'https://res.cloudinary.com/dobrmrt0g/image/upload/v1713014057/png-clipart-orb-os-x-icon-man-s-profile-icon-inside-white-circle-thumbnail_simwdv.png'
    }
}