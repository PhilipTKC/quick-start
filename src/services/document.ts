import { DI } from "aurelia";

import { MarkdownDocument, TableOfContents } from "@/interfaces";

export type IDocumentService = DocumentService;

export const IDocumentService = DI.createInterface<IDocumentService>(
    "IDocumentService",
    (x) => x.singleton(DocumentService)
);

export class DocumentService {
    async retrieveRootDocument(documentId: string): Promise<MarkdownDocument> {
        try {
            return await import(`../_content/${documentId}/${documentId}.md`);
        } catch {
            return { attributes: null, html: null, toc: null };
        }
    }

    async retrieveTableOfContents(id: string): Promise<TableOfContents> {
        try {
            return await import(`../_content/${id}/docs/toc.json`).then((x) => x.default);
        } catch {
            return null;
        }
    }

    async retrieveDocument(documentId: string, documentPath: string): Promise<any> {
        try {
            /*
            * https://vitejs.dev/guide/features.html#dynamic-import
            * Note that variables only represent file names one level deep.
            * If file is 'foo/bar', the import would fail. For more advanced usage, you can use the glob import feature.
            * https://vitejs.dev/guide/features.html#glob-import
            */
            const modules = import.meta.glob(`../_content/**/*.md`);
            return await modules[`../_content/${documentId}/docs/${documentPath}.md`]();
        } catch {
            return { attributes: null, html: null, toc: null };
        }
    }
}