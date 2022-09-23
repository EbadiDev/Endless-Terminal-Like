function outputText(output) {
  if (!output) return;

  // Adding "usage: " and flags to "help" string
  Object.entries(helpText).some(([key, value]) => {
    if (value.usage === output) {
      output = `usage: ${value.usage}`;

      if (value.flags) {
        if (value.flags) {
          const flagList = value.flags.map((flag) => `      ${flag}<br>`).join("");
          output += `<pre>  flags:<br>${flagList}</pre>`;
        }
      }
    }
  });

  const terminal = document.getElementById("terminal");
  const outputNode = document.createElement("div");
  const outputText = document.createElement("p");

  outputNode.classList.add("terminal-output");
  outputText.classList.add("output-text");

  // Check if output is array
  // and if it is print default new line output for each element
  if (Array.isArray(output)) {
    outputText.innerHTML = output
      .map((item) => {
        return `<span class="output-symbol">> </span>${item}<br>`;
      })
      .join(" ")
      .slice(0, -4); // remove last <br>
  } else {
    outputText.innerHTML = `<span class="output-symbol">> </span>${output}`;
  }

  outputNode.appendChild(outputText);
  terminal.appendChild(outputNode);
}

function outputBookmarks(bookmarksToOutput) {
  if (Array.isArray(bookmarksToOutput)) {
    const terminal = document.getElementById("terminal");
    const outputNode = document.createElement("div");
    const outputList = document.createElement("ul");

    outputNode.classList.add("terminal-output");
    outputList.classList.add("output-bookmarks");

    bookmarksToOutput.forEach(({ category, links }) => {
      const listItem = document.createElement("li");
      const listItemTitle = document.createElement("h6");
      const listItemLinks = document.createElement("ul");

      listItem.classList.add("bookmarks-category");
      listItemTitle.classList.add("category-title");
      listItemLinks.classList.add("category-links");

      listItemTitle.textContent = `${category}`;
      listItemLinks.innerHTML = links
        .map(({ name, url }) => {
          return `
          <li class="links-item">
            <a class="item-link" href=${url}>${name}</a>
          </li>
          `;
        })
        .join("");

      listItem.appendChild(listItemTitle);
      listItem.appendChild(listItemLinks);

      outputList.appendChild(listItem);
    });

    outputNode.appendChild(outputList);
    terminal.appendChild(outputNode);
  } else {
    outputText(COMMANDS.bm.help);
  }
}
