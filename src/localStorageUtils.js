// Write to localStorage
function lsWriteBackground() {
  localStorage.setItem(lsKeys.BACKGROUND, JSON.stringify(background));
}

function lsWriteGif() {
  localStorage.setItem(lsKeys.GIF, JSON.stringify(gif));
}

function lsWritePromptSymbol() {
  localStorage.setItem(lsKeys.PROMPT_SYMBOL, JSON.stringify(promptSymbol));
}

function lsWriteQuote() {
  localStorage.setItem(lsKeys.QUOTE, JSON.stringify(quote));
}

function lsWriteBookmarks() {
  localStorage.setItem(lsKeys.BOOKMARKS, JSON.stringify(bookmarks));
}

// Read from localStorage
function lsReadBackground() {
  return JSON.parse(localStorage.getItem(lsKeys.BACKGROUND));
}

function lsReadGif() {
  return JSON.parse(localStorage.getItem(lsKeys.GIF));
}

function lsReadPromptSymbol() {
  return JSON.parse(localStorage.getItem(lsKeys.PROMPT_SYMBOL));
}

function lsReadQuote() {
  return JSON.parse(localStorage.getItem(lsKeys.QUOTE));
}

function lsReadBookmarks() {
  return JSON.parse(localStorage.getItem(lsKeys.BOOKMARKS));
}
