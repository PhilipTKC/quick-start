import markdownIt from "markdown-it";
import hljs, { HighlightOptions } from "highlight.js";

export const highlighter = (code: string, language: string | HighlightOptions) => {
    if (language && hljs.getLanguage(language as string)) {
        try {
            return hljs.highlight(code, { language: language as string }).value;
        } catch (e) {
            console.log(e);
            console.error(`Failed to highlight "${language}": ${e.message}`);
        }
    }

    return markdownIt().utils.escapeHtml(code);
}