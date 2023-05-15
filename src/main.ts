import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';

import { MyApp } from '@/my-app';
import * as components from "@/components";
import * as valueConverters from "@/value-converters";
import * as customAttributes from "@/custom-attributes";

import "virtual:uno.css";

Aurelia
    .register(
        RouterConfiguration.customize({
            useUrlFragmentHash: false,
            title: {
                appTitle: "${componentTitles}${appTitleSeparator}Quickstart",
            },
            swapOrder: 'detach-current-attach-next',
        }),
        components,
        valueConverters,
        customAttributes
    )
    .app(MyApp).start();
