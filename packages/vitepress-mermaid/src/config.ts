import type { UserConfig } from 'vitepress';
import { mermaidMarkdownPlugin } from './mermaid-markdown';

const config: UserConfig = {
  markdown: {
    config: md => {
      mermaidMarkdownPlugin(md);
    },
  },
  vite: {
    ssr: {
      noExternal: ['@unify-js/vitepress-mermaid'],
    },
  },
};

export default config;
