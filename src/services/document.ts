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
            const path = `../_content/${documentId}/${documentId}.md`;
            return await import(/* @vite-ignore */ path);
        } catch {
            return { attributes: null, html: null, toc: null };
        }
    }

    async retrieveTableOfContents(id: string): Promise<TableOfContents> {
        try {
            const path = `../_content/${id}/docs/toc.json`;
            return await import(/* @vite-ignore */ path).then((x) => x.default);
        } catch {
            return null;
        }
    }

    async retrieveDocument(documentId: string, documentPath: string): Promise<MarkdownDocument> {
        try {
            const path = `../_content/${documentId}/docs/${documentPath}.md`;
            return await import(/* @vite-ignore */ path);
        } catch {
            return { attributes: null, html: null, toc: null };
        }
    }
}