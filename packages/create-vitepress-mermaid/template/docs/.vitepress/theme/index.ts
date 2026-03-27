import type { Theme } from 'vitepress';
import { MermaidTheme } from '@unify-js/vitepress-mermaid';
import '@unify-js/vitepress-mermaid/style.css';

export default {
  extends: MermaidTheme,
} satisfies Theme;
