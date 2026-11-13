// ---------- the store (from the task) ----------
const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };
            listeners.forEach((listener) => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        },
    };
};

// ---------- load saved state, with defaults ----------
const defaultState = { todos: [], filter: "all", theme: "light" };

function loadState() {
    try {
        const saved = localStorage.getItem("appState");
        return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch {
        return defaultState;
    }
}

const store = createStore(loadState());

// ---------- actions (they only call store.setState) ----------
function setFilter(filter) {
    store.setState({ filter });
}

function addTodo(text) {
    const { todos } = store.getState();
    store.setState({
        todos: [...todos, { id: Date.now(), text, completed: false }],
    });
}

function toggleTodo(id) {
    const { todos } = store.getState();
    store.setState({
        todos: todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
    });
}

function toggleTheme() {
    const { theme } = store.getState();
    store.setState({ theme: theme === "light" ? "dark" : "light" });
}

// ---------- render ----------
const list = document.getElementById("list");
const stateView = document.getElementById("state-view");

function render(state) {
    document.body.style.background = state.theme === "dark" ? "#222" : "#fff";
    document.body.style.color = state.theme === "dark" ? "#fff" : "#000";

    const visible = state.todos.filter((todo) => {
        if (state.filter === "done") return todo.completed;
        return true;
    });

    list.replaceChildren(
        ...visible.map((todo) => {
            const li = document.createElement("li");
            li.textContent = `${todo.completed ? "✓" : "○"} ${todo.text}`;
            li.addEventListener("click", () => toggleTodo(todo.id));
            return li;
        })
    );

    stateView.textContent = JSON.stringify(state, null, 2);
}

// ---------- subscribers: who reacts to a change ----------
store.subscribe(render);

store.subscribe((state) => {
    localStorage.setItem("appState", JSON.stringify(state));
});

// ---------- wiring ----------
document.getElementById("add-btn").addEventListener("click", () => {
    addTodo(`Task ${store.getState().todos.length + 1}`);
});
document.getElementById("theme-btn").addEventListener("click", toggleTheme);
document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

// ---------- start: draw what was loaded ----------
render(store.getState());