/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");
const fm = require('front-matter');
const fg = require('fast-glob');
const _ = require("lodash");

const docFolderPaths = fg.sync(path.join(__dirname, '../src/_content/**/docs'), { onlyDirectories: true });

docFolderPaths.forEach((folder) => {
    const documentPath = path.resolve(folder, "**/*.md");
    const documents = fg.sync(documentPath);

    const tableOfContents = [];

    documents.forEach((document) => {
        const resourceMatch = document.match(/(.*?\/docs\/)(.*)/);
        const [pathToFile, pathToDirectory, fileName] = resourceMatch;

        const data = fs.readFileSync(pathToFile, 'utf8');
        const attributes = fm(data).attributes;

        const currentDirectory = path.dirname(resourceMatch[0]);
        const parent = path.basename(currentDirectory);

        const content = {
            path: fileName,
            path1: fileName.split(".")[0],
            fileName: path.basename(fileName).split(".")[0],
            isParent: parent ? parent === "docs" : false,
            parent: parent.replace(/[0-9]-/g, '').trimStart(),
            title: fileName.split('/').pop().split(".")[0],
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