import type { UserConfig } from 'vitepress';
import { mermaidMarkdownPlugin } from './mermaid-markdown';

const config: UserConfig = {
  markdown: {
    config: md => {
      mermaidMarkdownPlugin(md);
    },
  },
};

export default config;
