import { ICustomElementViewModel, IDisposable, IEventAggregator, bindable, inject } from "aurelia";

import { DrawerSubscription } from "@qs/interfaces/enums";

/*
* TODO: Refactor Component
*/

export class SideDrawerNavigation implements ICustomElementViewModel {
    static inject = [Element, IEventAggregator];

    @bindable toc;

    private isDrawerOpen: boolean;

    private handleBodyClick: (ev: MouseEvent) => void;

    private subscription: IDisposable;

    private preventFirstClick: boolean = true;

    constructor(private readonly element: HTMLElement, @IEventAggregator private readonly ea: IEventAggregator) {
        this.handleBodyClick = (ev: MouseEvent): void => {
            if (this.preventFirstClick) {
                this.preventFirstClick = false;
                return;
            }

            if (this.element) {
                const withinElement = this.element.contains(ev.target as HTMLElement);

                if (!withinElement) {
                    this.closeDrawer();
                    this.preventFirstClick = true;
                }

                if (withinElement && (ev.target as HTMLElement).tagName === "A") {
                    this.closeDrawer();
                    this.preventFirstClick = true;
                }
            }
        };

        this.subscribeToDrawerOpenEvent();
    }

    dispose(): void {
        this.subscription.dispose();
    }

    openDrawer(): void {
        document.body.addEventListener("click", this.handleBodyClick);

        document.body.classList.remove("auto");
        document.getElementById("docs-container").classList.remove("auto");
        document.getElementById("tab-navigator").classList.remove("auto");

        document.body.classList.add("overflow-hidden");
        document.getElementById("docs-container").classList.add("pointer-events-none");
        document.getElementById("tab-navigator").classList.add("pointer-events-none");

        this.isDrawerOpen = true;

    }

    closeDrawer(): void {
        document.getElementById("outer-viewport").removeEventListener("click", this.handleBodyClick);

        document.body.classList.remove("overflow-hidden");
        document.getElementById("docs-container").classList.remove("pointer-events-none");
        document.getElementById("tab-navigator").classList.remove("pointer-events-none");

        document.body.classList.add("auto");
        document.getElementById("docs-container").classList.add("auto");
        document.getElementById("tab-navigator").classList.add("auto");

        this.isDrawerOpen = false;
    }

    subscribeToDrawerOpenEvent(): void {
        this.subscription = this.ea.subscribe(DrawerSubscription.Open, () => {
            this.openDrawer();
        });
    }
}