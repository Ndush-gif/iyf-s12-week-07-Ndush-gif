# Week 7: JavaScript Best Practices

## Author
- **Name:** Catherine Nduku
- **GitHub:** [Ndush-gif](https://github.com/Ndush-gif)
- **Date:** Nov 13, 2026

## Project Description
My Week 5 To-Do List, refactored into ES modules with localStorage persistence, ESLint and Prettier, and unit tests. Also includes the Shopping Cart class build and the Lesson 13 exercises.

## Technologies Used
- HTML5, CSS3
- JavaScript (ES modules)
- localStorage
- ESLint 10 (flat config) and Prettier
- Vitest

## Features
- Add, complete, edit (double-click) and delete tasks
- All / Active / Completed filters, "items left" count, clear completed
- Tasks and the selected filter survive a page refresh
- Safe when storage is empty or contains bad data
- 16 unit tests for the pure logic in `js/todo-logic.js`

## Project Structure
- `js/app.js`: starts the app and wires events
- `js/state.js`: state and actions, with one `commit()` that saves and redraws
- `js/storage.js`: localStorage helpers
- `js/todo-logic.js`: pure functions, no DOM or localStorage
- `js/ui.js`: all DOM code
- `tests/todo-logic.test.js`: unit tests
- `cart/`: Shopping Cart class build

## How to Run
1. Clone this repository
2. Run `npm install`
3. Open `index.html` with Live Server (modules don't load from `file://`)
4. Run `npm run lint` and `npm test` to check code quality

## Lessons Learned
- Keeping logic in pure functions makes it easy to test and keeps it separate from the DOM.
- Load from localStorage once, then save after every change through one function.
- ESLint 9 and later use `eslint.config.js`, not `.eslintrc.json`.

## Challenges Faced
- `package.json` ended up with two `scripts` blocks, which caused a JSON error. I deleted the old one.
- ES modules only work through a server, so I used Live Server.
- The `curly` rule flagged one-line `if` statements. `npm run lint:fix` added the braces.

## Collaboration
- **My PR (refactor):** PASTE-YOUR-PR-LINK-HERE
- **Review I wrote:** PASTE-YOUR-REVIEW-LINK-HERE
- **Notes:** (If nobody reviewed my PR, say so here and name who went missing.)
