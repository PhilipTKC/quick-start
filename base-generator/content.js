const path = require("path");
const fs = require("fs");
const fm = require('front-matter');
const fg = require('fast-glob');
const index = require("./algolia-sync");

const contentPath = fg.sync(path.join(__dirname, '../src/_content/*/*.md'), { ignore: [path.join(__dirname, '../src/_content/ignore/*.md')] });

/*
* TODO: Keep track of what folders have been deleted.
* Currently deleting all objects in the index and re-adding them.
*/
index.clearObjects();

contentPath.forEach((path) => {
  const data = fs.readFileSync(path, 'utf8');
  const attributes = fm(data).attributes;

  const { category_id, id } = attributes;

  if (category_id && id) {
    attributes["objectID"] = `${category_id}-${id}`;
    index.saveObject(attributes)
  } else {
    throw `category_id or/and id does not exist on ${path}`
  }
});