function cl(fullCommand) {
  const attributes = fullCommand.attributes;

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

function bm(fullCommand) {
  if (fullCommand.attributes.length > 1) return COMMANDS.bm.help;

  return fullCommand.attributes.length
    ? bookmarks.filter((item) => item.category === fullCommand.attributes[0])
    : bookmarks;
}
