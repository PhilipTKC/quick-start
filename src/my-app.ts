import { IRoute } from "@aurelia/router";
import { IEventAggregator } from "aurelia";

import { AnimationHooks } from "@/lifecycle-hooks/animation-hooks";

import { dom } from "@/_fontawesome";

import '@unocss/reset/tailwind.css';
import "./css/style.css";
import "./css/highlighter.css";
import "./css/nprogress.css";

import nProgress from "nprogress";

export class MyApp {
  static dependencies = [AnimationHooks];

  static routes: IRoute[] = [
    {
      path: "",
      component: async () => import("./pages/home"),
      title: "Home"
    },
    {
      path: ":documentId",
      component: async () => import("./pages/root/root"),
    }
  ];

  constructor(@IEventAggregator readonly ea: IEventAggregator,) {
    this.subscribeRouterStart();
    this.subscribeRouterEnd();
  }

  attached() {
    dom.watch();
  }

  /**
  * Subscribe to the router's navigation start event.
  */
  subscribeRouterStart() {
    this.ea.subscribe('au:router:navigation-start', () => {
      // Start the progress bar.
      nProgress.start();
    });
  }

  /**
  * Subscribe to the router's navigation end event.
  **/
  subscribeRouterEnd() {
    this.ea.subscribe('au:router:navigation-end', () => {
      // Complete the progress bar.
      nProgress.done();
      window.scrollTo(0, 0);
    });
  }
}
