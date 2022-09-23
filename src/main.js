// Defined commands
const COMMANDS = {
  cl: {
    func: output(cl, outputText),
    help: helpText.CREATE_LINK,
  },

  bm: {
    func: output(bm, outputBookmarks),
    help: helpText.BOOKMARKS,
  },
};

// IIFE for setup
(() => {
  // Read saved values from localStorage
  lsReadBackground() && (background = lsReadBackground());
  lsReadGif() && (gif = lsReadGif());
  lsReadPromptSymbol() && (promptSymbol = lsReadPromptSymbol());
  lsReadQuote() && (quote = lsReadQuote());
  lsReadBookmarks() && (bookmarks = lsReadBookmarks());

  // Set them if they exist
  setBackground();
  setGif();
  setPromptSymbol();
  setQuote();

  // Create initial prompt
  outputBookmarks(bookmarks);
  writePrompt();
  focusPrompt();

  document.addEventListener("keypress", handleKeyPresses);
})();

function handleKeyPresses(event) {
  switch (event.key) {
    case "Enter":
      const promptInput = document.getElementById("prompt-input");
      runCommand(promptInput.value);
      break;
  }
}

function runCommand(input) {
  fullCommand = parseFullCommand(input);

  if (COMMANDS[fullCommand.command]) {
    COMMANDS[fullCommand.command].func(fullCommand);
  }

  replacePrompt();
}
