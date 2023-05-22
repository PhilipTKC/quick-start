import { IRouteableComponent } from "@aurelia/router";
import {
  CustomElement, IDisposable, IEventAggregator, bindable, inject,
} from "aurelia";

import { IDocumentService } from "@qs/services/document";
import { convertToTitleCase, extractIdFromPath } from "@qs/utility";
import { AnimationHooks } from "@qs/lifecycle-hooks/animation-hooks";

interface GroupedHTMLElements {
  [key: string]: HTMLElement[];
}

type Parameters = { root: string; document: string };

@inject(Element)
export class Document implements IRouteableComponent {
  static dependencies = [AnimationHooks];

  static title = (viewModel: Document): string => {
    if (viewModel.attributes && viewModel.attributes.title) {
      return convertToTitleCase(viewModel.attributes.title);
    }

    return "Document";
  };

  @bindable private documentRef: HTMLElement;

  private markdownElement;

  private observer: IntersectionObserver;

  private headers;

  private attributes: any;

  private documentExist: boolean;

  private documentId: string;

  private documentPath: string;

  private handleTabClick: (
    groups: HTMLElement[],
    element: HTMLElement,
    key: string
  ) => any;

  private codeGroupMap: GroupedHTMLElements;

  private editorSubscriber: IDisposable;

  constructor(
    private readonly hostElement: Element,
    @IDocumentService private readonly documentService: IDocumentService,
    @IEventAggregator private readonly ea: IEventAggregator,
  ) {
    this.handleTabClick = (groups, element, key) => {
      // Remove active class from all elements in the same group
      groups.forEach((tab) => tab.classList.remove("tab-active"));

      // Add active class to the clicked element
      element.classList.toggle("tab-active");

      // Hide all elements in the same group
      const codeCollectionGroup = this.hostElement.querySelectorAll(
        `[data-code-group="${key}"]`,
      );
      codeCollectionGroup.forEach((codeBlock: HTMLElement) => {
        codeBlock.style.display = "none";
        codeBlock.classList.remove("code-active");
      });

      // Show the related data-group-code element
      const targetTabIndex = element.dataset.codeIndex;
      const targetCodeBlockElement = codeCollectionGroup[
        targetTabIndex
      ] as HTMLElement;
      targetCodeBlockElement.style.display = "block";
      targetCodeBlockElement.classList.add("code-active");
    };
  }

  async loading(parameters: Parameters) {
    const { root, document } = parameters;

    this.documentPath = this.returnPath({ root, document });

    this.documentId = extractIdFromPath(window.location.href);

    const {
      ATTRIBUTES, HTML, TOC,
    } = await this.documentService.retrieveDocument(this.documentId, this.documentPath);

    this.attributes = ATTRIBUTES;
    this.headers = TOC;

    if (HTML) {
      this.documentExist = true;
    }

    this.markdownElement = CustomElement.define({
      name: "markdown-document",
      template: HTML || "", // TODO: Add a fallback template
    });
  }

  attached() {
    this.intersectionObserver();

    // Find all elements with the data-group attribute
    const codeTabList = Array.from(
      this.hostElement.querySelectorAll("[data-group]"),
    );

    // Group all elements with the same data-group attribute value
    this.codeGroupMap = codeTabList.reduce((map, element: HTMLElement) => {
      const codeGroup = element.getAttribute("data-group");
      (map[codeGroup] ??= []).push(element);
      return map;
    }, {});

    this.toggleEventListenersForCodeGroups("Add");
  }

  detaching() {
    this.observer.disconnect();
    this.toggleEventListenersForCodeGroups("Remove");
  }

  /*
  * TODO: REFACTOR
  */
  toggleEventListenersForCodeGroups(operation: "Add" | "Remove") {
    for (const [key, groups] of Object.entries(this.codeGroupMap)) {
      for (const element of groups) {
        if (operation === "Add") {
          element.addEventListener("click", () => this.handleTabClick(groups, element, key));
        }

        if (operation === "Remove") {
          element.removeEventListener("click", () => this.handleTabClick(groups, element, key));
        }
      }
    }
  }

  returnPath({ root, document }: Parameters) {
    return document ? `${root}/${document}` : root;
  }

  intersectionObserver() {
    const elements = this.hostElement.querySelectorAll("[data-id]");

    const activeKeys = [];

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dataKey = entry.target.getAttribute("data-id");
          const headerItem = this.hostElement.querySelector(
            `[data-for="${dataKey}"]`,
          );

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
            const inactiveHeader = this.hostElement.querySelector(
              `[data-for="${key}"]`,
            );
            if (inactiveHeader) {
              inactiveHeader.classList.add("active-header");
            }
          });
        });
      },
      {
        rootMargin: "-72px 0px 0px 0px",
      },
    );

    elements.forEach((header) => {
      this.observer.observe(header);
    });
  }
}
