import { getFromStorage, saveToStorage } from "./storage.js";
import * as logic from "./todo-logic.js";

const TODOS_KEY = "todos";
const FILTER_KEY = "filter";
const VALID_FILTERS = ["all", "active", "completed"];

// ---------- load ONCE, safely ----------
const savedTodos = getFromStorage(TODOS_KEY, []);
const savedFilter = getFromStorage(FILTER_KEY, "all");

export const state = {
    todos: Array.isArray(savedTodos) ? savedTodos : [],
    filter: VALID_FILTERS.includes(savedFilter) ? savedFilter : "all",
    editingId: null,
};

// ---------- who to tell when something changes ----------
let changeListener = () => {};

export function onChange(listener) {
    changeListener = listener;
}

// ---------- one place that saves and notifies ----------
function commit() {
    saveToStorage(TODOS_KEY, state.todos);
    saveToStorage(FILTER_KEY, state.filter);
    changeListener();
}

// ---------- actions ----------
export function addTodo(text) {
    state.todos = logic.addTodo(state.todos, text);
    commit();
}

export function toggleTodo(id) {
    state.todos = logic.toggleTodo(state.todos, id);
    commit();
}

export function deleteTodo(id) {
    state.todos = logic.deleteTodo(state.todos, id);
    if (state.editingId === id) state.editingId = null;
    commit();
}

export function saveEdit(id, text) {
    state.todos = logic.editTodo(state.todos, id, text);
    state.editingId = null;
    commit();
}

export function clearCompleted() {
    state.todos = logic.clearCompleted(state.todos);
    if (!state.todos.some((todo) => todo.id === state.editingId)) {
        state.editingId = null;
    }
    commit();
}

export function setFilter(filter) {
    if (!VALID_FILTERS.includes(filter)) return;
    state.filter = filter;
    commit();
}

// ---------- editing is a screen state, nothing to save ----------
export function startEditing(id) {
    state.editingId = id;
    changeListener();
}

export function stopEditing() {
    state.editingId = null;
    changeListener();
}
