import { defineConfig } from 'vitepress';
import vitepressMermaidConfig from '@unify-js/vitepress-mermaid/config';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: vitepressMermaidConfig,
  title: 'Vitepress Mermaid Starter',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Mermaid Examples', link: '/mermaid-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [{ text: 'Mermaid Examples', link: '/mermaid-examples' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
