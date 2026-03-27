# @unify-js/vitepress-mermaid

A VitePress custom theme that provides fullscreen preview functionality for Mermaid diagrams, supporting zoom and drag-to-pan interactions.

## Features

- 🎯 **Click to Preview** - Click on Mermaid diagrams in your documentation to view them in fullscreen
- 🔍 **Free Zoom** - Supports zoom in/out/reset, with convenient mouse wheel zooming
- 🖐️ **Drag to Pan** - Drag to move and explore diagram details
- 🌓 **Dark Mode** - Automatically adapts to VitePress dark/light themes
- ⌨️ **Keyboard Shortcuts** - ESC to close, Ctrl/Cmd + +/- to zoom
- 📱 **Responsive Design** - Mobile-friendly interaction experience

## Choose Your Starting Point

| Scenario                   | Recommended Approach | Description                                               |
| -------------------------- | -------------------- | --------------------------------------------------------- |
| Creating a new project     | CLI Tool             | Scaffold a pre-configured project with sample diagrams    |
| Existing VitePress project | Manual Integration   | Install and configure the plugin in your existing project |

## Option 1: Scaffold with CLI

Use the `create-vitepress-mermaid` CLI tool to create a new pre-configured project:

```bash
# npm
npm create @unify-js/vitepress-mermaid

# pnpm
pnpm create @unify-js/vitepress-mermaid

# yarn
yarn create @unify-js/vitepress-mermaid
```

After creation, follow the instructions to install dependencies and start the dev server:

```bash
cd <project-name>
npm install  # or pnpm install, yarn
npm run dev  # or pnpm dev, yarn dev
```

The generated project includes sample Mermaid diagrams and complete TypeScript configuration.

## Option 2: Integrate into Existing Project

### Installation

Install the plugin using your preferred package manager:

```bash
pnpm add @unify-js/vitepress-mermaid
# or
npm install @unify-js/vitepress-mermaid
# or
yarn add @unify-js/vitepress-mermaid
```

### Dependency Requirements

This custom theme requires the following dependencies to work properly. Please make sure they are installed:

```bash
pnpm add -D vitepress mermaid
```

### Configuration

#### Step 1: Configure VitePress Config

In `.vitepress/config.ts`:

```typescript
import { defineConfig } from 'vitepress';
import vitepressMermaidConfig from '@unify-js/vitepress-mermaid/config';

export default defineConfig({
  extends: vitepressMermaidConfig,
  // Your VitePress config
});
```

#### Step 2: Configure Theme

In `.vitepress/theme/index.ts`:

```typescript
import type { Theme } from 'vitepress';
import { MermaidTheme } from '@unify-js/vitepress-mermaid';
import '@unify-js/vitepress-mermaid/style.css';

export default {
  extends: MermaidTheme,
} satisfies Theme;
```

## Using in Markdown

The custom theme automatically recognizes `mermaid` code blocks:

````markdown
```mermaid
graph TD
  A[Start] --> B{Decision}
  B -->|Condition 1| C[Process 1]
  B -->|Condition 2| D[Process 2]
  C --> E[End]
  D --> E
```
````

### Display Source Code

Use the `mermaid-example` language identifier to display both the diagram and its source code:

````markdown
```mermaid-example
graph LR
  A --> B --> C
```
````

## API Reference

### mermaidMarkdownPlugin

markdown-it plugin that converts mermaid code blocks to Vue components.

```typescript
import { mermaidMarkdownPlugin } from '@unify-js/vitepress-mermaid';

md.use(mermaidMarkdownPlugin);
```

## Keyboard Shortcuts

| Shortcut       | Function             |
| -------------- | -------------------- |
| `ESC`          | Close preview window |
| `Ctrl/Cmd + +` | Zoom in              |
| `Ctrl/Cmd + -` | Zoom out             |
| `Ctrl/Cmd + 0` | Reset zoom           |
| `Mouse wheel`  | Zoom                 |
| `Drag`         | Move diagram         |

## Requirements

- `vitepress`: ^2.0.0
- `mermaid`: ^11.0.0

## License

MIT
