// ============================================
// LESSON 10 — To-Do List
// THE RULE: the array is the truth, the page is a picture of it.
//   Every action = (1) change `todos`  (2) call render()
// ============================================

// ---------- DOM elements ----------
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// ---------- State ----------
let todos = [];
let currentFilter = "all";
let nextId = 1;
let editingId = null;
let pendingTextClick = null;

// ============================================
// STEP 1 — render the list from the array
// ============================================
function createTodoElement(todo) {
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

function visibleTodos() {
  if (currentFilter === "active") return todos.filter(t => !t.completed);
  if (currentFilter === "completed") return todos.filter(t => t.completed);
  return todos;
}

function render() {
  todoList.replaceChildren(...visibleTodos().map(createTodoElement));
  updateStats();
}

function updateStats() {
  const left = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = `${left} ${left === 1 ? "item" : "items"} left`;
}

// ============================================
// STEP 2 — add a task
// ============================================
function addTodo(text) {
  todos.push({ id: nextId++, text, completed: false });
  render();
}

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

// ✅ Commit:  git commit -m "Add: add tasks to the list"

// ============================================
// STEP 3 — toggle and delete with ONE delegated listener
// ============================================
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  if (editingId === id) editingId = null;
  render();
}

todoList.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item");
  if (!item) return;

  const id = Number(item.dataset.id);

  if (event.target.closest(".delete")) {
    deleteTodo(id);
    return;
  }
  if (event.target.closest(".edit")) return;

  if (event.target.closest(".todo-text")) {
    window.clearTimeout(pendingTextClick);
    pendingTextClick = window.setTimeout(() => {
      pendingTextClick = null;
      toggleTodo(id);
    }, 250);
    return;
  }

  toggleTodo(id);
});

todoList.addEventListener("dblclick", (event) => {
  const text = event.target.closest(".todo-text");
  if (!text) return;

  window.clearTimeout(pendingTextClick);
  pendingTextClick = null;
  const item = text.closest(".todo-item");
  editingId = Number(item.dataset.id);
  render();

  const editInput = todoList.querySelector(
    `.todo-item[data-id="${editingId}"] .edit`
  );
  editInput.focus();
  editInput.select();
});

todoList.addEventListener("keydown", (event) => {
  if (!event.target.matches(".edit")) return;

  if (event.key === "Enter") {
    const item = event.target.closest(".todo-item");
    const id = Number(item.dataset.id);
    const text = event.target.value.trim();

    const todo = todos.find(t => t.id === id);
    if (todo && text !== "") todo.text = text;
    editingId = null;
    render();
  } else if (event.key === "Escape") {
    editingId = null;
    render();
  }
});

// ✅ Commit:  git commit -m "Add: toggle and delete with event delegation"

// ============================================
// STEP 4 — filters, stats, clear completed
// ============================================
function filterTodos(filter) {
  currentFilter = filter;

  filters.forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  render();
}

filters.forEach(btn => {
  btn.addEventListener("click", () => filterTodos(btn.dataset.filter));
});

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  if (!todos.some(t => t.id === editingId)) editingId = null;
  render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);

// ✅ Commit:  git commit -m "Add: filters, stats and clear completed"

render();