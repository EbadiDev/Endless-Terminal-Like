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

  return [`[${name}] successfully added to [${category}] \\^o^/`, `url = ${url}`];
}

// Output list of bookmarks or bookmarks category
function bm(fullCommand) {
  const { attributes } = fullCommand;

  if (attributes.length > 1) return COMMANDS.bm.help;

  return attributes.length ? bookmarks.filter((item) => item.category === attributes[0]) : bookmarks;
}

// Clear console
function cc(fullCommand) {
  const { attributes } = fullCommand;

  if (attributes.length) {
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

  setQuote(newQuote.replaceAll('"', ""));
  lsWriteQuote();

  return "Your quote successfully installed \\^o^/";
}

// Output help for all defined functions
function h(fullCommand) {
  const { attributes, flags } = fullCommand;

  if (attributes.length) return COMMANDS.h.help;

  if (!flags.length) {
    return helpGeneral;
  }

  if (COMMANDS.h.flags.includes("-cl") && flags.includes("-cl")) {
    return [
      ...Object.entries(helpText).map(([key, value]) => {
        let output = `${key}:<br><pre>    usage: ${value.usage}</pre>`;

        if (value.flags) {
          const flagList = value.flags.map((flag) => `      ${flag}<br>`).join("");
          output += `<pre>    flags:<br>${flagList}</pre>`;
        }

        return output;
      }),
    ];
  }
}

// Open link
function ol(fullCommand) {
  const { attributes } = fullCommand;

  if (attributes.length > 1 || attributes.length < 1) return COMMANDS.ol.help;

  const links = bookmarks.flatMap((category) => category.links);
  const target = links.find((link) => link.name === attributes[0]);

  if (!target) return "there is no such link ＞﹏＜";

  window.open(target.url, "_blank");

  return [`[${target.name}] opened in new tab`, `url = ${target.url}`];
}

// Remove link
function rl(fullCommand) {
  const { attributes } = fullCommand;
  const target = attributes[0];

  if (attributes.length > 1 || attributes.length < 1) return COMMANDS.ol.help;

  let category = bookmarks.find((category) => category.links.some((link) => link.name == target)) || null;

  if (!category) return "there is no such link ＞﹏＜";

  const linkToDelete = category.links.find((link) => link.name === target);
  category.links = category.links.filter((link) => link !== linkToDelete);

  lsWriteBookmarks();

  return [`[${linkToDelete.name}] deleted from ${category.category}`, `url was = ${linkToDelete.url}`];
}

// Remove category
function rc(fullCommand) {
  const { attributes } = fullCommand;
  const target = attributes[0];

  if (attributes.length > 1 || attributes.length < 1) return COMMANDS.ol.help;

  let category = bookmarks.find((category) => category.category === target) || null;

  if (!category) return "there is no such category ＞﹏＜";

  const links = category.links;
  bookmarks = bookmarks.filter((item) => item !== category);

  lsWriteBookmarks();

  return [
    `[${target}] deleted`,
    `links were: <pre>${links
      .map((link) => `   > ${link.name}<br>     url = ${link.url}<br><br>`)
      .join("")
      .slice(0, -4)}</pre>`,
  ];
}

// Edit category
function ec(fullCommand) {
  const { attributes } = fullCommand;
  const oldName = attributes[0];
  const newName = attributes[1];

  if (attributes.length > 2 || attributes.length < 2) return COMMANDS.ec.help;

  let category = bookmarks.find((category) => category.category === oldName) || null;

  if (!category) return "there is no such category ＞﹏＜";

  bookmarks[bookmarks.indexOf(category)].category = newName;

  lsWriteBookmarks();

  return `[${oldName}] changed to [${newName}]`;
}

function el(fullCommand) {
  const { attributes, flags } = fullCommand;

  const flagsMap = {
    "-n": "name",
    "-u": "url",
  };
  let output;

  const name = attributes[0];
  const newValue = attributes[1];

  if (attributes.length > 2 || attributes.length < 2) return COMMANDS.el.help;
  if (flags.length !== 1) return COMMANDS.el.help;

  let category = bookmarks.find((category) => category.links.some((link) => link.name == name)) || null;

  if (!category) return "there is no such link ＞﹏＜";

  const linkToEdit = category.links.find((link) => link.name === name);

  if (flags[0] === "-n" && COMMANDS.el.flags.includes("-n")) {
    output = `${linkToEdit.name} changed to ${newValue}`;
    linkToEdit.name = newValue;
  }

  if (flags[0] === "-u" && COMMANDS.el.flags.includes("-n")) {
    output = `${linkToEdit.url} changed to ${newValue}`;
    linkToEdit.url = newValue;
  }

  lsWriteBookmarks();

  return [`[${name}] value to change ${flagsMap[flags[0]]}`, output];
}
