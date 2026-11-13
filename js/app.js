import {
    state,
    onChange,
    addTodo,
    toggleTodo,
    deleteTodo,
    saveEdit,
    clearCompleted,
    setFilter,
    startEditing,
    stopEditing,
} from "./state.js";
import { form, input, formError, todoList, filters, clearCompletedBtn, render } from "./ui.js";

const SINGLE_CLICK_DELAY_MS = 250;
let pendingTextClick = null;

// redraw whenever the state changes
onChange(() => render(state));

// ---------- add ----------
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();

    if (text === "") {
        formError.textContent = "Type a task first.";
        return;
    }

    formError.textContent = "";
    addTodo(text);
    input.value = "";
    input.focus();
});

// ---------- toggle and delete: ONE delegated listener ----------
todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) {return;}

    const id = Number(item.dataset.id); // dataset is a string!

    if (event.target.closest(".delete")) {
        deleteTodo(id);
        return;
    }
    if (event.target.closest(".edit")) {return;}

    if (event.target.closest(".todo-text")) {
        window.clearTimeout(pendingTextClick);
        pendingTextClick = window.setTimeout(() => {
            pendingTextClick = null;
            toggleTodo(id);
        }, SINGLE_CLICK_DELAY_MS);
        return;
    }

    toggleTodo(id);
});

// ---------- double-click to edit ----------
todoList.addEventListener("dblclick", (event) => {
    const text = event.target.closest(".todo-text");
    if (!text) {return;}

    window.clearTimeout(pendingTextClick);
    pendingTextClick = null;
    startEditing(Number(text.closest(".todo-item").dataset.id));
});

// ---------- Enter saves, Escape cancels ----------
todoList.addEventListener("keydown", (event) => {
    if (!event.target.matches(".edit")) {return;}

    if (event.key === "Enter") {
        const id = Number(event.target.closest(".todo-item").dataset.id);
        saveEdit(id, event.target.value);
    } else if (event.key === "Escape") {
        stopEditing();
    }
});

// ---------- filters and clear completed ----------
filters.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// ---------- start ----------
render(state);
