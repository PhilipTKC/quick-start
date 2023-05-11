# Quick Start

## WIP

This application requires Algolia be configured.

## Algolia Search

```bash
touch algolia.config.json
```

```json
{
    "appId": "someAppID",
    "searchKey": "someSearchKey",
    "indice": "someIndex"
}
```

## Algolia Admin

`/base-generator/.env` requires the following

```bash
APP_ID=someAppID
SECRET_KEY=someKey
INDEX=someIndex
```

### Run Dev Server

```bash
pnpm install
pnpm start
```

## Base Generator

Generates the required files for the application to work.

Run the generator to re-generate files and make the required changes and updates.

```bash
cd base-generator
pnpm install
```

Once the dependencies have been installed, run the following command to generate the required files.

```bash
pnpm run generate
```

## Path to Documents

```bash
[basePath]/src/_content/**/*.md
```

## Documents

### Root Document

```bash
URL: locahost:9000/example-1/start
Path: _content/[example-1]/[example-1.md]
```

The root document should contain the following FrontMatter

```md
---
title: SomeTitle
id: some-title
category: SomeCategory
category_id: somecategory
description: SomeDescription
last_updated: 1970-1-1T00:00:00.000Z
docs: [true/false]
---

Some Content
```

### Attribute Usage

- **title**: Used for displaying name of document under category
- **id**: Kebab-case of title used for routing to the correct document
- **category**: Used for displaying name of category.
- **category_id**: Kebab-case of category. Used for generating `objectID` with `id` attribute.
- **description**: Currently not used. Will be used for search querying.
- **last_updated**: Useful to determine last time document was updated.
- **docs**: Determine whether or not document contains additional documentation.

### Documentation

Documentation will only be available to view if the root document attribute is set to true.

### Documentation Structure

```bash
# URL: locahost:9000/example-1/docs/example
_content/[example-1]/docs/[example.md]

# URL: locahost:9000/example-1/docs/0-example-category/child1
_content/[example-1]/docs/[0-example-category]/[child1.md]

# URL: locahost:9000/example-1/docs/0-example-category/child1
_content/[example-1]/docs/[0-example-category]/[child-2.md]

# URL: locahost:9000/example-1/docs/0-example-category/child2
_content/[example-1]/docs/[1-another-category]/[child1.md]
```

Documents can contain frontmatter with the `order` attribute to sort documents, `title` is optional, the attribute should match the file name in `Title Case` this is used for setting the title. eg. `Some Readme > Docs > Child 1`

child1.md

```md
---
order: 0
title: Child 1
---

Some Content
```

child2.md

```md
---
order: 1
title: Child 2
---

Some Content
```

Documents can be sorted into folders. Documents within a folder will be grouped together when rendered in the `<table-of-contents>` component.

To sort categories, Folders should be prefixed with a number. The number is not rendered but will be apart of the URL.

`example-1/docs/0-example-category/child1`

```bash
├─ example.md
├─ 0-example-category
|  ├─ child1.md
|  ├─ child2.md
├─ 1-another-category
|  ├─ child1.md
```

Example output in the following snippet.

```html
<ul>
    <h1>
        Docs
    </h1>

    <li class="my-4">
        <a class="au" href="example/docs/example">
            Example
        </a>
    </li>

    <h1>
        example-category
    </h1>

    <li class="my-4">
        <a href="example/docs/0-example-category/child1">
            child1
        </a>
    </li>
    <li class="my-4">
        <a href="example/docs/0-example-category/child2">
            child2
        </a>
    </li>

    <h1>
        another-category
    </h1>

    <li class="my-4">
        <a href="example/docs/1-another-category/child1">
            child1
        </a>
    </li>
</ul>
```

### Markdown Configuration

WIP
