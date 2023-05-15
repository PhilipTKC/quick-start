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
        const element = this.documentRef.querySelector(`[data-key='${id}']`);

        // Retrieve the height of the tab navigator
        // TODO: Calculate this dynamically
        const tabNavigatorHeight = 72;

        // Offset the scroll position by the height of the tab navigator
        const yOffset = -tabNavigatorHeight - 10;

        if (element) {
            const { top } = element.getBoundingClientRect();
            const { pageYOffset } = this.platform.window;
            const y = top + pageYOffset + yOffset;
            // Smooth scroll to the element
            this.platform.window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
}