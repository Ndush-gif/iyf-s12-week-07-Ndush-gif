import { filterTodos, countActive } from "./todo-logic.js";

// ---------- DOM elements (found once) ----------
export const form = document.getElementById("todo-form");
export const input = document.getElementById("todo-input");
export const formError = document.getElementById("form-error");
export const todoList = document.getElementById("todo-list");
export const filters = document.querySelectorAll(".filter");
export const clearCompletedBtn = document.getElementById("clear-completed");
const itemsLeft = document.getElementById("items-left");

// ---------- one list item ----------
function createTodoElement(todo, editingId) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = todo.completed;

    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit";
        editInput.value = todo.text;
        editInput.setAttribute("aria-label", `Edit "${todo.text}"`);
        li.append(editInput);
    } else {
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        li.append(span);
    }

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", `Delete "${todo.text}"`);

    li.prepend(checkbox);
    li.append(del);
    return li;
}

// ---------- draw everything from the state ----------
export function render(state) {
    const visible = filterTodos(state.todos, state.filter);
    todoList.replaceChildren(...visible.map((todo) => createTodoElement(todo, state.editingId)));

    const left = countActive(state.todos);
    itemsLeft.textContent = `${left} ${left === 1 ? "item" : "items"} left`;

    filters.forEach((btn) => {
        const isActive = btn.dataset.filter === state.filter;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });

    const editInput = todoList.querySelector(".edit");
    if (editInput) {
        editInput.focus();
        editInput.select();
    }
}