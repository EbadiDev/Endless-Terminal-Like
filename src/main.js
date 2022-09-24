// Defined commands
const COMMANDS = {
  cl: {
    func: output(cl, outputText),
    help: helpText.CREATE_LINK.usage,
  },

  ol: {
    func: output(ol, outputText),
    help: helpText.OPEN_LINK.usage,
  },

  rl: {
    func: output(rl, outputText),
    help: helpText.REMOVE_LINK.usage,
  },

  rc: {
    func: output(rc, outputText),
    help: helpText.REMOVE_CATEGORY.usage,
  },

  bm: {
    func: output(bm, outputBookmarks),
    help: helpText.BOOKMARKS.usage,
  },

  cc: {
    func: output(cc, outputText),
    help: helpText.CLEAR.usage,
  },

  sq: {
    func: output(sq, outputText),
    help: helpText.SET_QUOTE.usage,
  },

  ec: {
    func: output(ec, outputText),
    help: helpText.EDIT_CATEGORY.usage,
  },

  el: {
    func: output(el, outputText),
    help: helpText.EDIT_LINK.usage,
    flags: ["-n", "-u"],
  },

  h: {
    func: output(h, outputText),
    help: helpText.HELP.usage,
    flags: ["-cl"],
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
  outputText(greetingsText);
  bookmarks.length && outputBookmarks(bookmarks);
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
  const commandToExecute = COMMANDS[fullCommand.command];

  commandToExecute && commandToExecute.func(fullCommand);
  !commandToExecute && outputText(["no such command ＞﹏＜", 'try "h" or "h -cl"']);

  fullCommand.command !== "cc" && replacePrompt();

  focusPrompt();
}
