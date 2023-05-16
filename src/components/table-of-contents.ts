import { ICustomElementViewModel, bindable } from "aurelia";

import { TableOfContents as ITableOfContents } from "@qs/interfaces";

export class TableOfContents implements ICustomElementViewModel {
    @bindable private toc: ITableOfContents;
}