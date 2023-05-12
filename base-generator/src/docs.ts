import path from "path";
import fs from "fs";
import fm from 'front-matter';
import fg from 'fast-glob';
import _ from "lodash";

import { DocsAttributes, contentPath } from './common';

const documentFolderPath = fg.sync(path.join(contentPath, '**/docs'), { onlyDirectories: true });

export const generateTableOfContents = () => {
    /*
    * Loop through all markdown files in the docs folder.
    * [0]: /public/content/readme/docs
    * [0]: /public/content/another-readme/docs
    */
    documentFolderPath.forEach((folder) => {
        const documentPath = path.resolve(folder, "**/*.md");
        const documents = fg.sync(documentPath);

        const tableOfContents: DocsAttributes[] = [];

        /*
        * Loop through all markdown files
        * [0]: /public/content/readme/docs/readme.md
        * [1]: /public/content/readme/docs/0-some-category/readme.md
        */

        documents.forEach((document) => {
            // Match all markdown files within the docs folder
            const resourceMatch = document.match(/(.*?\/docs\/)(.*)/);

            if (!resourceMatch) {
                return;
            }

            const [pathToFile, pathToDirectory, fileName] = resourceMatch as [string, string, string];

            const markdown = fs.readFileSync(pathToFile, 'utf8');
            const { attributes } = fm(markdown) as { attributes: DocsAttributes };

            const currentDirectory = path.dirname(resourceMatch[0]);
            const parent = path.basename(currentDirectory);

            const content = {
                path: fileName,
                path1: fileName.split(".")[0],
                fileName: path.basename(fileName).split(".")[0],
                isParent: parent === "docs",
                parent: parent.replace(/[0-9]-/g, '').trimStart(),
                title: fileName.split('/').pop()!.split(".")[0],
                order: attributes.order || 0
            };

            tableOfContents.push(content);
        });

        const sorted = _.chain(tableOfContents)
            .orderBy(item => item.order)
            .groupBy("parent")
            .value();

        fs.writeFileSync(path.resolve(folder, `toc.json`), JSON.stringify(sorted));
    });
}