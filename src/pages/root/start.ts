import { CustomElement } from "aurelia";
import { IRouteableComponent, Parameters } from "@aurelia/router";

import { IDocumentService } from "@qs/services";
import { Attributes } from "@qs/interfaces";
import { AnimationHooks } from "@qs/lifecycle-hooks/animation-hooks";

export class Start implements IRouteableComponent {
  static dependencies = [AnimationHooks];

  private id: string;

  private attributes: Attributes;

  private markdownElement: any;

  private documentExist: boolean;

  constructor(
    @IDocumentService private readonly documentService: IDocumentService,
  ) { }

  async loading(parameters: Parameters): Promise<void> {
    this.id = parameters.documentId as string;

    const { ATTRIBUTES, HTML } = await this.documentService.retrieveRootDocument(this.id);

    this.attributes = ATTRIBUTES;

    if (HTML) {
      this.documentExist = true;
    }

    this.markdownElement = CustomElement.define({
      name: "markdown-document",
      template: HTML || "", // TODO: Add a fallback template
    });
  }
}
