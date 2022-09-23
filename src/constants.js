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
    usage: 'sq [word] | "[words]"',
  },

  HELP: {
    usage: "h",
    flags: "-cl (command list)",
  },
};

const helpGeneral = `<pre>
All commands go like:
  * first letter = fs *
  > fs of first word + fs of second word
  > if there is only one word => only one letter

Examples:

  > [c]reate [l]ink:
    cl - usage: ${helpText.CREATE_LINK.usage}

  > [h]elp:
    h - usage: ${helpText.HELP.usage}

Enter [ h -cl ] for command list
</pre>
`;
