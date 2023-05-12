import { IRouteableComponent } from "@aurelia/router";
import { CustomElement, IPlatform, bindable } from "aurelia";

import { IDocumentService } from "@/services/document";
import { convertToTitleCase, extractIdFromPath } from "@/utility";
import { AnimationHooks } from "@/lifecycle-hooks/animation-hooks";

type Parameters = { root: string; document: string }

export class Document implements IRouteableComponent {
    static dependencies = [AnimationHooks];

    static title = (viewModel: Document): string => {
        if (viewModel.attributes && viewModel.attributes.title) {
            return convertToTitleCase(viewModel.attributes.title);
        }

        return "Document";
    };

    @bindable private documentRef;

    private markdownElement;

    private observer: IntersectionObserver;

    private headers;

    private attributes: any;

    private documentExist: boolean;

    constructor(
        @IDocumentService private readonly documentService: IDocumentService,
        @IPlatform private readonly platform: IPlatform
    ) { }

    async loading(parameters: Parameters) {
        const { root, document } = parameters;

        const path = this.returnPath({ root, document });

        const id = extractIdFromPath(window.location.href);

        const { attributes, html, toc } = await this.documentService.retrieveDocument(id, path);

        this.attributes = attributes;
        this.headers = toc;

        if (html) {
            this.documentExist = true;
        }

        this.markdownElement = CustomElement.define({
            name: 'markdown-document',
            template: html || "" // TODO: Add a fallback template
        });
    }

    attached() {
        this.intersectionObserver();
    }

    detaching() {
        this.observer.disconnect();
    }

    returnPath({ root, document }: Parameters) {
        return document ? `${root}/${document}` : root;
    }

    intersectionObserver() {
        const headers = this.platform.document.querySelectorAll("[data-key], [data-key-content]");

        const activeKeys = [];

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const dataKey = entry.target.getAttribute("data-key") || entry.target.getAttribute("data-key-content");
                const headerItem = this.platform.document.querySelector(`[data-for="${dataKey}"]`);
                if (entry.isIntersecting) {
                    activeKeys.push(dataKey);

                    if (headerItem) {
                        headerItem.classList.add("active-header");
                    }
                } else if (activeKeys.includes(dataKey)) {
                    activeKeys.splice(activeKeys.indexOf(dataKey), 1);
                    if (headerItem) {
                        headerItem.classList.remove("active-header");
                    }
                }

                activeKeys.forEach((key) => {
                    const inactiveHeader = this.platform.document.querySelector(`[data-for="${key}"]`);
                    if (inactiveHeader) {
                        inactiveHeader.classList.add("active-header");
                    }

                });

            });
        }, {
            rootMargin: "-72px 0px 0px 0px",
        });

        headers.forEach((header) => {
            this.observer.observe(header);
        })
    }
}