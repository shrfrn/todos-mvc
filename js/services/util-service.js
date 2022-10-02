'use strict'

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value)
    localStorage.setItem(key, strValue)
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getFormattedTime(ts) {
    const time = new Date(ts)
    var str = ''

    str += time.getHours() + ':'
    str += time.getMinutes() + ' ,'
    str += time.getDate() + '.'
    str += Number(time.getUTCMonth()) + 1 + '.'
    str += time.getFullYear()

    return str
}