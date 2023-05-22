import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const markedConfig = {
    gfm: true
};

const highlightConfig = {
    langPrefix: 'hljs language-',
    highlight(code: string, lang: string) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    }
};

marked.use(markedConfig);
marked.use(markedHighlight(highlightConfig));

export default marked;