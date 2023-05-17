import { DrawerSubscription } from "@qs/interfaces/enums";
import { ICustomElementViewModel, IEventAggregator, bindable } from "aurelia";

export class TabMenu implements ICustomElementViewModel {
    @bindable id: string;

    @bindable path: string;

    constructor(@IEventAggregator private readonly ea: IEventAggregator) {

    }

    openDrawerNavigationMenu() {
        this.ea.publish(DrawerSubscription.Open);
    }
}