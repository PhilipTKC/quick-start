import { ICustomElementViewModel, bindable } from "aurelia";

import { TableOfContents as ITableOfContents } from "../interfaces";

export class TableOfContents implements ICustomElementViewModel {
    @bindable private toc: ITableOfContents;
}