// Create link
function cl(fullCommand) {
  const { attributes } = fullCommand;

  if (attributes.length < 3) return COMMANDS.cl.help;

  const category = attributes[0];
  const name = attributes[1];
  const url = formatUrl(attributes[2]);

  const targetCategory = bookmarks.find((item) => item.category === category);
  const targetCategoryIndex = bookmarks.indexOf(targetCategory);

  if (!targetCategory) {
    bookmarks.push({
      category: category,
      links: [{ name: name, url: url }],
    });
  }

  if (targetCategory) {
    if (targetCategory.links.find((item) => item.name === name)) {
      return "such link already exists!";
    }

    bookmarks[targetCategoryIndex].links.push({
      name: name,
      url: url,
    });
  }

  lsWriteBookmarks();
}

// Output list of bookmarks or bookmarks category
function bm(fullCommand) {
  const { attributes } = fullCommand;

  if (attributes.length > 1) return COMMANDS.bm.help;

  return attributes.length
    ? bookmarks.filter((item) => item.category === attributes[0])
    : bookmarks;
}

// Clear console
function cc(fullCommand) {
  const { attributes, flags } = fullCommand;

  if (attributes.length || flags.length) {
    return COMMANDS.cc.help;
  }

  const terminal = document.getElementById("terminal");

  while (terminal.firstChild) {
    terminal.removeChild(terminal.firstChild);
  }

  writePrompt();
}

// Set quote
function sq(fullCommand) {
  const { attributes } = fullCommand;
  let newQuote = attributes[0];

  if (attributes.length > 1 || !newQuote) return COMMANDS.sq.help;

  setQuote(newQuote);
  lsWriteQuote();

  return "Your quote successfully installed \\^o^/";
}

// Output help for all defined functions
function h(fullCommand) {
  const { flags } = fullCommand;

  if (!flags.length) {
    return helpGeneral;
  }

  if (flags.includes("-cl")) {
    return Object.entries(helpText)
      .map(([key, value]) => {
        return `${key}:<br><pre>  usage: ${value.usage}</pre><br>`;
      })
      .join("")
      .slice(0, -4); // Remove last <br>
  }
}
