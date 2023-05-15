import markdownIt from "markdown-it";
import { highlighter } from './highlighter';

import aureliaRoutesPlugin from "markdown-it-au-external-links";
import dataAttributePlugin from "markdown-it-data-attribute";
import { imageDimensionsPlugin, ImagePluginOptions } from 'markdown-it-image-dimensions';
import codeCollectionPlugin from "markdown-it-code-collection";

const markdownItConfig = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: highlighter
})
    /*
    * This plugin allows aurelia to handle internal and external links properly
    * https://github.com/PhilipTKC/markdown-it-aurelia-routes-plugin
    */
    .use(aureliaRoutesPlugin)
    /*
    * This plugin is used to add data attributes to elements
    * https://github.com/PhilipTKC/markdown-it-data-attribute
    */
    .use(dataAttributePlugin)
    /*
    * Adds classnames, width, height and lazy loading support.
    * https://github.com/PhilipTKC/markdown-it-image-dimensions-plugin
    */
    .use<ImagePluginOptions>(imageDimensionsPlugin, {
        container: "",
        image: "",
        loading: "lazy",
        decode: true,
        // When removeSource is used, DataAttributesPlugin must be used.
        // see ./src/custom-attributes/lazy-load.ts
        removeSource: true
    })
    /*
    * This plugin creates a collection of tabbed code blocks using custom syntax
    * https://github.com/PhilipTKC/markdown-it-code-collection
    */
    .use(codeCollectionPlugin)

module.exports = markdownItConfig;