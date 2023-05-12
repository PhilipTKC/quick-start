import { join } from "path";
import { readFileSync } from "fs";
import fm from 'front-matter';
import { sync } from 'fast-glob';
import { index } from "./algolia-sync";

import { DocAttributes, contentPath } from './common';

export const saveToAlgolia = () => {
  /*
  * TODO: Keep track of what folders have been deleted.
  * Currently deleting all objects in the index and re-adding them.
  */
  index.clearObjects();

  const ignorePath = join(contentPath, 'ignore', '*.md');
  const markdownFiles = sync(join(contentPath, '*', '*.md'), { ignore: [ignorePath] });

  markdownFiles.forEach((path) => {
    const data = readFileSync(path, 'utf8');
    const attributes = fm(data).attributes as DocAttributes;

    const { category_id, id } = attributes;

    if (category_id && id) {
      attributes["objectID"] = `${category_id}-${id}`;
      index.saveObject(attributes)
    } else {
      throw `category_id or/and id does not exist on ${path}`
    }
  });
}