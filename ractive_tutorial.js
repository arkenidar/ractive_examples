var ractive = new Ractive({

    target: '#target',

    template: '#template',

    data: {

        todos: localStorage.todos ? JSON.parse(localStorage.todos) : [],

        editing: -1,
        edit_mode: true,
        reorder_mode: false,
    },

})

function add() {
    var item = ractive.get('item')
    if (item.trim() == '') return
    var todos = ractive.get('todos')
    todos.push(item)
    ractive.set('todos', todos)
    localStorage.todos = JSON.stringify(todos)
    ractive.set('item', '')
}

function remove(item) {
    ractive.set('editing', -1)
    var todos = ractive.get('todos')
    todos.splice(item, 1)
    ractive.set('todos', todos)
    localStorage.todos = JSON.stringify(todos)
}

function edit(index) {
    ractive.set('item_edit', ractive.get('todos')[index])
    ractive.set('editing', index)
    document.querySelector('#item_edit').focus()
}

function save(index) {
    ractive.set('editing', -1)
    var item_edit = ractive.get('item_edit')
    if (item_edit.trim() == '') {
        remove(index)
        return
    }
    var todos = ractive.get('todos')
    todos[index] = item_edit
    ractive.set('todos', todos)
    localStorage.todos = JSON.stringify(todos)
}

function swap(array, index_a, index_b) {
    var temp = array[index_a]
    array[index_a] = array[index_b]
    array[index_b] = temp
    return array
}

function up(index) {
    var todos = ractive.get('todos')
    if (index <= 0) return
    todos = swap(todos, index, index - 1)
    ractive.set('todos', todos)
    localStorage.todos = JSON.stringify(todos)
}

function down(index) {
    var todos = ractive.get('todos')
    if (index >= (todos.length - 1)) return
    todos = swap(todos, index, index + 1)
    ractive.set('todos', todos)
    localStorage.todos = JSON.stringify(todos)
}

function toggle_edit_mode() {
    ractive.set('reorder_mode', false)
    ractive.set('edit_mode', !ractive.get('edit_mode'))
}

function toggle_reorder_mode() {
    ractive.set('editing', -1)
    ractive.set('reorder_mode', !ractive.get('reorder_mode'))
}