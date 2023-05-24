/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-redeclare */
import { DI } from "aurelia";

import { MarkdownDocument, TableOfContents } from "@qs/interfaces";

export type IDocumentService = DocumentService;

export const IDocumentService = DI.createInterface<IDocumentService>(
  "IDocumentService",
  (x) => x.singleton(DocumentService),
);

export class DocumentService {
  async retrieveRootDocument(documentId: string): Promise<MarkdownDocument> {
    try {
      return await import(`../_content/${documentId}/${documentId}.md`);
    } catch (error) {
      return { FRONTMATTER: null, HTML: null, TOC: null };
    }
  }

  async retrieveTableOfContents(id: string): Promise<TableOfContents> {
    try {
      return await import(`../_content/${id}/docs/toc.json`).then((x) => x.default);
    } catch {
      return null;
    }
  }

  async retrieveDocument(documentId: string, documentPath: string, raw?: boolean): Promise<any> {
    try {
      /*
      * https://vitejs.dev/guide/features.html#dynamic-import
      * Note that variables only represent file names one level deep.
      * If file is 'foo/bar', the import would fail. For more advanced usage, you can use the glob import feature.
      * https://vitejs.dev/guide/features.html#glob-import
      */
      let modules = import.meta.glob("../_content/**/*.md");

      if (raw) {
        modules = import.meta.glob("../_content/**/*.md", { as: "raw" });
      }

      return await modules[`../_content/${documentId}/docs/${documentPath}.md`]();
    } catch (e) {
      return {
        FRONTMATTER: null, HTML: null, TOC: null,
      };
    }
  }
}
