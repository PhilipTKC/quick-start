import { bindable, ICustomElementViewModel, IPlatform } from "aurelia";

type Header = {
    id: string;
    text: string;
}

export class InThisDocument implements ICustomElementViewModel {
    private headers: Header[];

    @bindable private documentRef: HTMLElement;

    constructor(@IPlatform private readonly platform: IPlatform) {
    }

    attached() {
        this.headers = Array.from(
            this.documentRef.querySelectorAll("h1, h2, h3, h4, h5, h6")
        ).map(element => {
            const level = (element: Element) => {
                switch (element.tagName) {
                    case "H1":
                        return 1;
                    case "H2":
                        return 2;
                    case "H3":
                        return 3;
                    case "H4":
                        return 4;
                    case "H5":
                        return 5;
                    case "H6":
                        return 6;
                }
            }

            return {
                slug: element.getAttribute("data-key"),
                id: element.id,
                text: element.textContent,
                level: level(element),
            };
        });
    }

    scrollIntoView(id: string) {
        // Retrieve the element with the given id
        const element = document.querySelector(`[data-key='${id}']`);

        // Retrieve the height of the tab navigator
        const tabNavigator = document.getElementById("tab-navigator");
        // Offset the scroll position by the height of the tab navigator
        const yOffset = -tabNavigator.offsetHeight - 10;

        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            // Smooth scroll to the element
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
}