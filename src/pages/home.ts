import { IRouteableComponent } from "@aurelia/router";

import { AnimationHooks } from "@qs/lifecycle-hooks/animation-hooks";

export class Home implements IRouteableComponent {
  static dependencies = [AnimationHooks];
}
