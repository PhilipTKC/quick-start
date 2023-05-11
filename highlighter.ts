import markdownIt from "markdown-it";
import hljs, { HighlightOptions } from "highlight.js";

export const highlighter = (language: string, optionsOrCode: string | HighlightOptions) => {
    if (language && hljs.getLanguage(language)) {
        try {
            return hljs.highlight(optionsOrCode as string, { language: language }).value;
        } catch (e) {
            console.error(`Failed to highlight "${language}": ${e.message}`);
        }
    }

    return markdownIt().utils.escapeHtml(language);
}