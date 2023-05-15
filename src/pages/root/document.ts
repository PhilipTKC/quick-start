import { IRouteableComponent } from "@aurelia/router";
import { CustomElement, bindable, inject } from "aurelia";

import { IDocumentService } from "@/services/document";
import { convertToTitleCase, extractIdFromPath } from "@/utility";
import { AnimationHooks } from "@/lifecycle-hooks/animation-hooks";

interface GroupedHTMLElements {
    [key: string]: HTMLElement[];
}

type Parameters = { root: string; document: string }

@inject(Element)
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

    private handleTabClick: (groups: HTMLElement[], element: HTMLElement, key: string) => void;

    private codeGroupMap: GroupedHTMLElements;

    constructor(
        private readonly hostElement: Element,
        @IDocumentService private readonly documentService: IDocumentService
    ) {
        this.handleTabClick = (groups, element, key) => {
            // Remove active class from all elements in the same group
            groups.forEach(tab => tab.classList.remove('active'));

            // Add active class to the clicked element
            element.classList.toggle('active');

            // Hide all elements in the same group
            const codeCollectionGroup = this.hostElement.querySelectorAll(`[data-code-group="${key}"]`)
            codeCollectionGroup.forEach((codeBlock: HTMLElement) => {
                codeBlock.style.display = 'none';
                codeBlock.classList.remove('active');
            });

            // Show the related data-group-code element
            const targetTabIndex = element.dataset.codeIndex;
            const targetCodeBlockElement = codeCollectionGroup[targetTabIndex] as HTMLElement;
            targetCodeBlockElement.style.display = 'block';
            targetCodeBlockElement.classList.add('active');
        }
    }

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

        this.codeGroupMap = {};
    }

    attached() {
        this.intersectionObserver();

        // Find all elements with the data-group attribute
        const codeTabList = Array.from(this.hostElement.querySelectorAll('[data-group]'));

        // Group all elements with the same data-group attribute value
        this.codeGroupMap = codeTabList.reduce((map, element: HTMLElement) => {
            const codeGroup = element.getAttribute('data-group');
            (map[codeGroup] ??= []).push(element);
            return map;
        }, {});

        this.toggleEventListenersForCodeGroups("Add");
    }

    detaching() {
        this.observer.disconnect();

        this.toggleEventListenersForCodeGroups("Remove");
    }

    toggleEventListenersForCodeGroups(operation: "Add" | "Remove") {
        // Remove all event listeners
        for (const [key, groups] of Object.entries(this.codeGroupMap)) {
            for (const element of groups) {
                if (operation === "Add") {
                    element.addEventListener('click', () => this.handleTabClick(groups, element, key));
                }

                if (operation === "Remove") {
                    element.removeEventListener('click', () => this.handleTabClick(groups, element, key));
                }
            }
        }
    }

    returnPath({ root, document }: Parameters) {
        return document ? `${root}/${document}` : root;
    }

    /*
    * TODO: REFACTOR!
    * Determine cause of bug where the headers are not being highlighted
    */
    intersectionObserver() {
        const headers = this.hostElement.querySelectorAll("[data-key], [data-key-content]");

        const activeKeys = [];

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const dataKey = entry.target.getAttribute("data-key") || entry.target.getAttribute("data-key-content");
                const headerItem = this.hostElement.querySelector(`[data-for="${dataKey}"]`);
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
                    const inactiveHeader = this.hostElement.querySelector(`[data-for="${key}"]`);
                    if (inactiveHeader) {
                        inactiveHeader.classList.add("active-header");
                    }

                });

            });
        }, {
            rootMargin: "0px 0px 0px 0px",
        });

        headers.forEach((header) => {
            this.observer.observe(header);
        })
    }
}