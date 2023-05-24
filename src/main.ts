import Aurelia from "aurelia";
import { RouterConfiguration } from "@aurelia/router";

import { MyApp } from "@qs/my-app";
import * as components from "@qs/components";
import * as valueConverters from "@qs/value-converters";
import * as customAttributes from "@qs/custom-attributes";

import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

Aurelia
  .register(
    RouterConfiguration.customize({
      useUrlFragmentHash: false,
      title: {
        // eslint-disable-next-line no-template-curly-in-string
        appTitle: "${componentTitles}${appTitleSeparator}Quickstart",
      },
      swapOrder: "detach-current-attach-next",
    }),
    components,
    valueConverters,
    customAttributes,
  )
  .app(MyApp).start();
