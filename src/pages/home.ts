import { IRouteableComponent } from "@aurelia/router";

import { AnimationHooks } from "@/lifecycle-hooks/animation-hooks";

export class Home implements IRouteableComponent {
    static dependencies = [AnimationHooks];
}