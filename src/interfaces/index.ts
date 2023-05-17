export type Attributes = Record<string, unknown>;
export type TOC = { level: string, content: string }

export type MarkdownDocument = { attributes: Attributes, html: string, toc: TOC[] }

export interface TableOfContents {
  docs: Document[],
  [key: string]: Document[]
}

interface Document {
  path: string
  path1: string
  fileName: string
  isParent: boolean
  parent: string
  title: string
  order: number
}

export interface AlgoliaHitResults {
  [key: string]: DocumentObject[]
}

interface DocumentObject {
  title: string
  id: string
  category: string
  category_id: string
  description: string
  last_updated: string
  docs: boolean
  objectID: string
  _highlightResult: HighlightResult
}

interface HighlightResult {
  id: Id
  category_id: CategoryId
}

interface Id {
  value: string
  matchLevel: string
  matchedWords: any[]
}

interface CategoryId {
  value: string
  matchLevel: string
  matchedWords: any[]
}