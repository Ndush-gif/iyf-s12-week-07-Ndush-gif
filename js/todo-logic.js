export function addTodo(todos, text, id = Date.now()) {
    const trimmed = text.trim();
    if (trimmed === "") return todos;
    return [...todos, { id, text: trimmed, completed: false }];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function editTodo(todos, id, text) {
    const trimmed = text.trim();
    if (trimmed === "") return todos;
    return todos.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo));
}

export function clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos, filter) {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
}

export function countActive(todos) {
    return todos.filter((todo) => !todo.completed).length;
}
