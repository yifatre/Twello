import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const                                                                                                                                                                                                                                                                                                                                                                                                            userServiceHttp = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials,
    getUsers
}


function login({ email, password }) {

    return httpService.post(BASE_URL + 'login', { email, password })
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({email, username, password, fullname }) {
    const user = { email,username, password, fullname, isAdmin: false}
    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid signup')
        })
}


function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}


function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    return httpService.put('/user', { diff })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}



function getById(userId) {
    return httpService.get('user/' + userId)
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score, isAdmin:user.isAdmin || ''}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function getUsers() {
    return httpService.get(`user`)
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



