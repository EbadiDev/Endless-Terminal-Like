const gifs = {
  CLOUDS: "assets/gifs/clouds.gif",
};

const backgrounds = {
  VILLAGE: "assets/backgrounds/village.png",
  TREE: "assets/backgrounds/tree.png",
};

const promptSymbols = {
  1: "$",
  2: ">>",
  3: ">",
  4: "<>",
  5: "▶",
};

const types = {
  LINK: "link",
  CATEGORY: "category",
};

const lsKeys = {
  BACKGROUND: "endless-installed-background",
  GIF: "endless-installed-gif",
  PROMPT_PLACEHOLDER: "endless-installed-quote",
  PROMPT_SYMBOL: "endless-installed-prompt-symbol",
  QUOTE: "endless-installed-quote",
  BOOKMARKS: "endless-saved-bookmarks",
};

const helpText = {
  CREATE_LINK: {
    usage: "cl [category] [name] [url]",
  },

  BOOKMARKS: {
    usage: "bm | bm [category]",
  },

  CLEAR: {
    usage: "cc",
  },

  SET_QUOTE: {
    usage: 'sq [quote] | "[quote]"',
  },

  HELP: {
    usage: "h",
    flags: ["-cl (command list)"],
  },

  OPEN_LINK: {
    usage: 'ol ([link] | "[link]")',
  },

  REMOVE_LINK: {
    usage: 'rl ([link] | "[link]")',
  },

  REMOVE_CATEGORY: {
    usage: 'rl ([category] | "[category]"',
  },

  EDIT_LINK: {
    usage: 'el ([link] | "[link]") [url] ',
    flags: ["-n (edit name)", "-u (edit url)"],
  },

  EDIT_CATEGORY: {
    usage: 'ec ([category] [category]) | ("[category]" "[category]")',
  },
};

const helpGeneral = [
  `All commands go like:
  <pre>

    > first letter of first word + first letter of second word
    > if there is only one word => only one letter
    > use quotes when you need combine 
      words to one string</pre>`,

  `Examples:
  <pre>

    > [c]reate [l]ink:
       cl - usage: ${helpText.CREATE_LINK.usage}

    > [h]elp:
       h - usage: ${helpText.HELP.usage}

    > [s]et [q]uote:
       sq - usage: ${helpText.SET_QUOTE.usage}</pre>`,

  `Enter 'h -cl' for command list`,
];
