'use strict'

var gTodos
var gFilterBy = 'All'
var gSort = 'unsorted'

function createTodos() {
    gTodos = loadFromStorage('todos')

    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn JS', 1),
            _createTodo('Master CSS', 1),
            _createTodo('Live good', 1),
        ]
        saveTodos()
    }
}

function getTodosForDisplay() {

    if(gSort !== 'unsorted') gTodos.sort(compareTodos)
    else gTodos = loadFromStorage('todos')

    if (gFilterBy === 'All') return gTodos

    return gTodos.filter(todo => 
        todo.isDone && gFilterBy === 'Done' ||
        !todo.isDone && gFilterBy === 'Active')
}

function hasTodosForDisplay() {
    if (gFilterBy === 'All') {
        return gTodos.length ? true : false
    } else if (gFilterBy === 'Done') {
        return gTodos.some(todo => todo.isDone)
    } else {
        return gTodos.some(todo => !todo.isDone)
    } 
}

function compareTodos(todo1, todo2) {
    switch (gSort) {
        case 'Text': return compareByText(todo1, todo2)
        case 'Created': return compareBy('createdAt', todo1, todo2)
        case 'Importance': return compareBy('importance', todo1, todo2)
    }
}

function compareByText(todo1, todo2) {
    return todo1.txt.localeCompare(todo2.txt)
}

function compareBy(key, todo1, todo2) {
    return todo1[key] - todo2[key]
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveTodos()
}

function deleteTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId )
    gTodos.splice(todoIdx, 1)

    saveTodos()
}

function moveTodo(todoId, diff) {
    var todoIdx = gTodos.findIndex(todo => todo.id === todoId )

    var currTodo = gTodos[todoIdx]
    var nextTodo = gTodos[todoIdx + diff]

    gTodos[todoIdx] = nextTodo
    gTodos[todoIdx + diff] = currTodo

    saveTodos()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(todo => todo.id === todoId )
    todo.isDone = !todo.isDone
    saveTodos()
}

function setFilter(txt) {
    gFilterBy = txt
}

function getFilter() {
    return gFilterBy
}

function setSort(txt) {
    gSort = txt
}

function getSort() {
    return gSort
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    var activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function saveTodos() {
    saveToStorage('todos', gTodos)
}

// Private functions

function _createTodo(txt, importance) {
    return {
        id: makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        importance,
    }
}