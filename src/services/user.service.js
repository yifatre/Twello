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
    getUsers
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
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    console.log("user", user)
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


