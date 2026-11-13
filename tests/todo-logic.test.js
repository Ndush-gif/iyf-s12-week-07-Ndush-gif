import { describe, it, expect } from "vitest";
import {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    filterTodos,
    countActive,
} from "../js/todo-logic.js";

const sample = [
    { id: 1, text: "Buy milk", completed: false },
    { id: 2, text: "Study JS", completed: true },
    { id: 3, text: "Call Amina", completed: false },
];

describe("addTodo", () => {
    it("adds a trimmed todo to the end", () => {
        const result = addTodo(sample, "  Write tests  ", 4);
        expect(result).toHaveLength(4);
        expect(result[3]).toEqual({ id: 4, text: "Write tests", completed: false });
    });

    it("ignores empty or whitespace-only text", () => {
        expect(addTodo(sample, "   ")).toEqual(sample);
    });

    it("works on an empty list", () => {
        expect(addTodo([], "First", 1)).toHaveLength(1);
    });
});

describe("toggleTodo", () => {
    it("flips completed for the matching id only", () => {
        const result = toggleTodo(sample, 1);
        expect(result[0].completed).toBe(true);
        expect(result[1].completed).toBe(true);
        expect(result[2].completed).toBe(false);
    });

    it("changes nothing when the id does not exist", () => {
        expect(toggleTodo(sample, 999)).toEqual(sample);
    });
});

describe("deleteTodo", () => {
    it("removes the matching todo", () => {
        const result = deleteTodo(sample, 2);
        expect(result.map((todo) => todo.id)).toEqual([1, 3]);
    });
});

describe("editTodo", () => {
    it("updates the text", () => {
        expect(editTodo(sample, 1, " Buy bread ")[0].text).toBe("Buy bread");
    });

    it("rejects empty text", () => {
        expect(editTodo(sample, 1, "")).toEqual(sample);
    });
});

describe("filterTodos", () => {
    it("returns everything for 'all'", () => {
        expect(filterTodos(sample, "all")).toHaveLength(3);
    });

    it("returns only active todos", () => {
        expect(filterTodos(sample, "active").map((todo) => todo.id)).toEqual([1, 3]);
    });

    it("returns only completed todos", () => {
        expect(filterTodos(sample, "completed").map((todo) => todo.id)).toEqual([2]);
    });
});

describe("countActive and clearCompleted", () => {
    it("counts active todos", () => {
        expect(countActive(sample)).toBe(2);
    });

    it("returns 0 for an empty list", () => {
        expect(countActive([])).toBe(0);
    });

    it("removes completed todos", () => {
        expect(clearCompleted(sample).map((todo) => todo.id)).toEqual([1, 3]);
    });
});

describe("purity: the original array is never changed", () => {
    it("leaves the input untouched after every operation", () => {
        const original = structuredClone(sample);

        addTodo(sample, "New", 4);
        toggleTodo(sample, 1);
        deleteTodo(sample, 1);
        editTodo(sample, 1, "Changed");
        clearCompleted(sample);

        expect(sample).toEqual(original);
    });

    it("returns a new array rather than the same one", () => {
        expect(toggleTodo(sample, 1)).not.toBe(sample);
    });
});
