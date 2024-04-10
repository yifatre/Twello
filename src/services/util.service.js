export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getFormattedTime,
    getModalPosition,
    getInitials,
    getDateFormat
}

function makeId(firstLetter = '', length = 6) {
    var txt = firstLetter
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function getFormattedTime(date) {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    if (hours !== 0 && minutes !== 0)
        return `${date.toString().slice(4, 7)} ${date.getDate()} at ${hours > 12 ? hours - 12 : hours}:${(date.getMinutes() + '').padStart(2, '0')} ${hours > 12 ? 'PM' : 'AM'}`
    return `${date.toString().slice(4, 7)} ${date.getDate()}`

}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getModalPosition(target, offsetx = 0, offsety = 0) {
    const { bottom, top, left, right, height, width, x, y } = target.getBoundingClientRect()
    // const left = target.offsetLeft
    // const top = target.offsetTop
    return { top: top + offsety, left: left + offsetx }
}

function getInitials(name) {
    const colors = ["#0052CC", "#00A3BF", "#00875A", "#FF991F", "#DE350C", "#5343AA", "#172B4E"]
    const letterToNumber = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 1,
        I: 2,
        J: 3,
        K: 4,
        L: 5,
        M: 6,
        N: 7,
        O: 1,
        P: 2,
        Q: 3,
        R: 4,
        S: 5,
        T: 6,
        U: 7,
        V: 1,
        W: 2,
        X: 3,
        Y: 4,
        Z: 5
    }

    return {
        initials: name
            .match(/(\b\S)?/g)
            .join("")
            .match(/(^\S|\S$)?/g)
            .join("").toUpperCase(), color: colors[letterToNumber[name.slice(0, 1).toUpperCase()]]
    }
}

function getDateFormat(dateLongForm) {
    const dateString = dateLongForm
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`
    console.log(formattedDate)
    return formattedDate
}

function getDnDStyle(){
    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250,
        color: isDraggingOver ? "black" : "white",
        cursor: "all-scroll"
      });
}