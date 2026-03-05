---
layout: home

hero:
  name: 'VitePress Mermaid'
  text: 'Interactive Mermaid Diagrams'
  tagline: A VitePress custom theme for Mermaid diagram preview with fullscreen, zoom, and pan support
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Examples
      link: /examples/
    - theme: alt
      text: GitHub
      link: https://github.com/unify-js/vitepress-mermaid

features:
  - icon: 🎯
    title: Click to Preview
    details: Click on any Mermaid diagram in your docs to open it in fullscreen mode for better viewing.
  - icon: 🔍
    title: Zoom & Pan
    details: Freely zoom in/out with mouse wheel or keyboard shortcuts, and drag to pan around large diagrams.
  - icon: 🌓
    title: Dark Mode Support
    details: Automatically adapts to VitePress light/dark theme with smooth transitions.
  - icon: ⌨️
    title: Keyboard Shortcuts
    details: ESC to close, Ctrl/Cmd +/- to zoom, Ctrl/Cmd 0 to reset - intuitive and efficient.
  - icon: 📱
    title: Responsive Design
    details: Mobile-friendly with touch gestures support for zooming and panning.
  - icon: ⚡
    title: Easy Integration
    details: Simple setup with theme extension for quick integration.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPFeature {
  border-radius: 12px;
  padding: 24px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.VPFeature:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
</style>
