import { ICustomElementViewModel, IPlatform, bindable } from "aurelia";

export class DocumentProgressBar implements ICustomElementViewModel {
    private showProgressBar = false;

    private progressBarElement: HTMLDivElement;

    private handleScrollEvent: () => void;

    private progressPercentage = 0;

    constructor(@IPlatform private readonly platform: IPlatform) {
        this.handleScrollEvent = () => {
            const { scrollY, document } = this.platform.window;
            const { documentElement } = document;
            const { scrollTop, scrollHeight, clientHeight } = documentElement;

            const winScroll = scrollY || scrollTop;
            const height = scrollHeight - clientHeight;
            const percentage = (winScroll / height) * 100;

            this.progressBarElement.style.width = `${percentage}%`;
            this.progressPercentage = percentage;
        };
    }

    attached() {
        this.platform.document.addEventListener("scroll", this.handleScrollEvent);
    }

    detaching() {
        this.platform.document.removeEventListener("scroll", this.handleScrollEvent);
    }
}