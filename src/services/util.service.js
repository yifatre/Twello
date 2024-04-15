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
    getDateFormat,
    timeAgo,
    deleteLabelIdFromEverywhere
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
        console.log('timer', timer)
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
    console.log('x,y,left,top', x, y, left, top)
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

function getDnDStyle() {
    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250,
        color: isDraggingOver ? "black" : "white",
        cursor: "all-scroll"
    });
}

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


function _getFormattedDate(date, prefomattedDate = false, hideYear = false) {

    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        return `${day}. ${month} at ${hours}:${minutes}`;
    }

    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return _getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
        return _getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return _getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return _getFormattedDate(date); // 10. January 2017. at 10:20
}

function deleteLabelIdFromEverywhere(data, labelIdToDelete) {
    const updatedData = data.map(group => {
        const updatedTasks = group.tasks.map(task => {
            const updatedTask = { ...task }
            const labelIndex = updatedTask.labelIds.indexOf(labelIdToDelete)
            if (labelIndex !== -1) {
                updatedTask.labelIds.splice(labelIndex, 1)
            }
            return updatedTask
        })
        return { ...group, tasks: updatedTasks }
    })
    return updatedData
}
