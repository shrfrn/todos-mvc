'use strict'

function onInit() {
    createTodos()
    renderTodos()
}

function renderTodos() {
    var todos = getTodosForDisplay()
    var strHtmls = todos.map(getTodosStrHTML)

    document.querySelector('.todo-list').innerHTML = strHtmls.join('')

    renderStats()
    renderStatus()
}

function renderStatus() {
    const filterBy = getFilter()

    if (!hasTodosForDisplay()) {
        if (filterBy === 'All') {
            document.querySelector('.status').innerText = `No Todos`
        } else
            document.querySelector('.status').innerText = `No ${filterBy} Todos`
    } else {
        document.querySelector('.status').innerText = ''
    }
}

function getTodosStrHTML(todo, idx, todos) {
    const className = todo.isDone ? 'done' : ''
    
    const sortBy = getSort()
    var strMoveBtns = ''
    
    if(sortBy === 'unsorted'){

        const disableMoveUp = idx === 0 ? 'disabled' : ''
        const disableMoveDown = idx === todos.length - 1 ? 'disabled' : ''
        
        strMoveBtns = `
            <button ${disableMoveUp} onclick="onMoveTodo(event, '${todo.id}', -1)">+</button>
            <button ${disableMoveDown} onclick="onMoveTodo(event, '${todo.id}',1)">-</button>
        `
    }
    
    return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
                <button onclick="onDeleteTodo(event, '${todo.id}')">x</button>
                ${strMoveBtns}
                <span>${todo.importance}</span>   
                      ${todo.txt}  
                <span>${getFormattedTime(todo.createdAt)}</span> 
            </li>`
}

function renderStats() {
    document.querySelector('.total-count').innerText = getTotalCount()
    document.querySelector('.active-count').innerText = getActiveCount()
}

function onAddTodo() {
    const elTxt = document.querySelector('.todo')
    const txt = elTxt.value
    if (!txt) return
    
    const elImportance = document.querySelector('.importance')
    const importance = +elImportance.value
    if(!importance || importance < 1 || importance > 3) return

    addTodo(txt, importance)
    renderTodos()
    elTxt.value = elImportance.value = ''
}

function onDeleteTodo(ev, todoId) {
    ev.stopPropagation()

    const isDelete = confirm('Are You Sure?')
    if (isDelete) {
        deleteTodo(todoId)
        renderTodos()
    }
}
function onMoveTodo(ev, todoId, diff) {
    ev.stopPropagation()

    moveTodo(todoId, diff)
    renderTodos()
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(txt) {
    setFilter(txt)
    renderTodos()
}

function onSetSort(txt) {
    setSort(txt)
    renderTodos()
}
