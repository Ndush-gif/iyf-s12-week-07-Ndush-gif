// TASK 13.1
// Excercise 3

const STORAGE_KEY = "notes";

// ---------- storage helpers (from Exercise 3) ----------
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    if (data === null) return defaultValue;
    try {
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

// ---------- DOM ----------
const form = document.getElementById("note-form");
const input = document.getElementById("note-input");
const noteList = document.getElementById("note-list");

// ---------- state: load ONCE ----------
let notes = getFromStorage(STORAGE_KEY, []);

// ---------- one place that saves and redraws ----------
function commit() {
    saveToStorage(STORAGE_KEY, notes);
    render();
}

function render() {
    noteList.replaceChildren(
        ...notes.map((note) => {
            const li = document.createElement("li");
            li.dataset.id = note.id;

            const text = document.createElement("span");
            text.textContent = note.text;

            const del = document.createElement("button");
            del.type = "button";
            del.className = "delete";
            del.textContent = "Delete";

            li.append(text, del);
            return li;
        })
    );
}

// ---------- actions ----------
function addNote(text) {
    notes = [...notes, { id: Date.now(), text }];
    commit();
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    commit();
}

// ---------- events ----------
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;
    addNote(text);
    input.value = "";
    input.focus();
});

// ONE listener for all delete buttons (event delegation)
noteList.addEventListener("click", (event) => {
    if (!event.target.matches(".delete")) return;
    const id = Number(event.target.closest("li").dataset.id); // dataset is a string!
    deleteNote(id);
});

render(); // draw whatever was loaded from storage
