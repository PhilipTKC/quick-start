import { ICustomElementViewModel, IPlatform } from "aurelia";

export class DocumentProgressBar implements ICustomElementViewModel {
    private showProgressBar = false;

    private progressBarElement: HTMLDivElement;

    private handleScrollEvent: () => void;

    private progressPercentage = 0;

    constructor(@IPlatform private readonly platform: IPlatform) {
        this.handleScrollEvent = () => {
            const winScroll = window.scrollY || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percentage = (winScroll / height) * 100;
            this.progressBarElement.style.width = `${percentage}%`;
            this.progressPercentage = percentage;
          };
    }

    attached() {
        this.platform.window.document.addEventListener("scroll", this.handleScrollEvent);
    }

    detaching() {
        this.platform.window.document.removeEventListener("scroll", this.handleScrollEvent);
    }
}