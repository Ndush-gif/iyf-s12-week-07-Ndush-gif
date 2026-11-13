# Week 7: JavaScript Best Practices

## Author
- **Name:** Catherine Nduku
- **GitHub:** [Ndush-gif](https://github.com/Ndush-gif)
- **Date:** Nov 14, 2026

## Project Description
My Week 5 To-Do List, refactored. It now saves its tasks and filter in localStorage so they survive a page refresh, it is split into ES modules, it passes ESLint, and the logic is covered by unit tests. The repo also holds the Lesson 13 shopping cart, practice exercises and the daily challenges.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES modules, localStorage)
- ESLint and Prettier
- Vitest
- Git and GitHub

## Features
- Add, complete, edit and delete tasks, and filter by All, Active and Completed
- Tasks and the selected filter are saved in localStorage and restored on load, and the app starts safely when storage is empty or holds bad data
- Code split into `js/app.js`, `state.js`, `storage.js`, `todo-logic.js` and `ui.js`
- `todo-logic.js` holds pure functions with no DOM and no localStorage, which makes them testable
- ESLint (flat config) and Prettier set up, with `npm run lint` and `npm run format`
- 16 Vitest tests for `todo-logic.js`, run with `npm test`
- Shopping cart class build in `cart/`
- Daily challenges in `daily-challenges/`: theme persistence, recent searches, form auto-save and a written code review of my weather dashboard

## How to Run
1. Clone this repository
2. Run `npm install` (Node 22 or 24 is required)
3. Open `index.html` with the Live Server extension in VS Code. Modules only load from a server, so double-clicking the file will not work.
4. Run `npm test` for the unit tests, and `npm run lint` to check the code

## Project Structure
```
iyf-s12-week-07-Ndush-gif/
├── index.html
├── styles.css
├── js/
│   ├── app.js
│   ├── state.js
│   ├── storage.js
│   ├── todo-logic.js
│   └── ui.js
├── tests/
│   └── todo-logic.test.js
├── cart/
├── daily-challenges/
├── notes/
├── session-form13.3/
├── state-pattern-management13.4/
├── eslint.config.js
├── .prettierrc
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Lessons Learned
- localStorage only stores strings, so objects go in with `JSON.stringify` and come back with `JSON.parse`, inside a `try/catch` so bad data cannot crash the app.
- Load once at startup, change the array, then save and redraw from one `commit()` function.
- Keeping the logic in pure functions that take an array and return a new one makes it easy to test, and nothing else needs a browser.
- A script that uses `import` needs `type="module"` and a server such as Live Server.
- `node_modules/` goes in `.gitignore` before the first `npm install`.

## Challenges Faced
- Merging `main` into my refactor branch produced conflicts in my Lesson 13 practice files, because the same files existed on both branches. I resolved the conflict by keepng the lesson 13 files.

## Collaboration
- **PR I opened:** https://github.com/Ndush-gif/iyf-s12-week-07-Ndush-gif/pull/1
