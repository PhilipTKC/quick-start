import { IRoute, IRouteableComponent, Parameters } from "@aurelia/router";

import { convertToTitleCase } from "@/utility";

export class Root implements IRouteableComponent {
    static routes: IRoute[] = [
        {
            path: "start",
            component: () => import("./start")
        },
        {
            path: ["docs"],
            component: () => import("./docs")
        }
    ];

    static title = (viewModel: Root): string => {
        return convertToTitleCase(viewModel.id);
    };

    private id: string;

    async loading(parameters: Parameters): Promise<void> {
        this.id = parameters.documentId as string;
    }
}