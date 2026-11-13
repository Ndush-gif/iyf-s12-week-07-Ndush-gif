# Day 5: Code Review of my Weather Dashboard

## Handles well
- Checks `response.ok` and gives separate messages for 404, 401 and other failures
- Shows loading, error and success states, and hides loading in `finally`
- Keeps the API key in a git-ignored `config.js` and a GitHub Actions secret

## Improvements needed
- The `catch` block must call `showError(...)`, otherwise errors are never shown
- Add the submit listener and the history click listener, so searches actually run
- Replace `historyList.innerHTML = ""` with `replaceChildren()`
- Declare `let recent` at the top of the file, before the functions that use it
- Add a README "How to run" with the `config.example.js` step
- Add tests for the pure parts, such as the history logic
- Rotate the API key, because it was shared outside my computer