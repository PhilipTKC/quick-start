import {
  IRoute,
  IRouteableComponent,
  IRouter,
  Parameters,
} from "@aurelia/router";
import { IEventAggregator } from "aurelia";

import { IDocumentService } from "@qs/services";
import { TableOfContents } from "@qs/interfaces";
import { AnimationHooks } from "@qs/lifecycle-hooks/animation-hooks";

export class Docs implements IRouteableComponent {
  static dependencies = [AnimationHooks];

  static routes: IRoute[] = [
    {
      path: ":root/:document?",
      component: () => import("./document"),
    },
  ];

  private id: string;

  private tableOfContents: TableOfContents;

  constructor(
    @IDocumentService private readonly documentService: IDocumentService,
    @IEventAggregator private readonly ea: IEventAggregator,
    @IRouter private readonly router: IRouter,
  ) { }

  async loading(parameters: Parameters) {
    const { documentId } = parameters;

    this.id = documentId as string;

    this.tableOfContents = await this.documentService.retrieveTableOfContents(
      documentId as string,
    );
  }

  attached() {
    this.ea.subscribeOnce("au:router:navigation-end", async (route: any) => {
      if (
        route.navigation.instruction === "docs"
        || route.navigation.instruction === `/${this.id}/docs`
      ) {
        // Load the root document if no document is specified
        // eg: from .../example/docs to .../example/docs/example
        await this.router.load(`${this.id}/docs/${this.id}`);
      }
    });
  }
}
