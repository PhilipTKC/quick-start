import {
    IRoute,
    IRouteableComponent,
    Parameters,
    RouterNavigationEndEvent,
} from "@aurelia/router";

import { convertToTitleCase } from "@qs/utility";
import { IEventAggregator } from "aurelia";

export class Root implements IRouteableComponent {
    static routes: IRoute[] = [
        {
            path: "start",
            component: () => import("./start"),
        },
        {
            path: ["docs"],
            component: () => import("./docs"),
        },
    ];

    static title = (viewModel: Root): string => convertToTitleCase(viewModel.id);

    private id: string;

    private path = "";

    constructor(@IEventAggregator private readonly ea: IEventAggregator) {
        this.subscribeRouteChangeEvent();
    }

    async loading(parameters: Parameters): Promise<void> {
        this.id = parameters.documentId as string;
    }

    subscribeRouteChangeEvent() {
        this.ea.subscribe(
            "au:router:navigation-end",
            (payload: RouterNavigationEndEvent) => {
                this.path = payload.navigation.path;
            },
        );
    }
}
