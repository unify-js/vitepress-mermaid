---
name: document-update
description: 当涉及到文档更新的时候，根据该技能的提示进行操作。
---

根据代码的修改，查看是否涉及以下文档的更新：

1. `docs/` 目录下的文档。该目录使用 vitepress 搭建文档，包含英文跟中文文档，更改的时候需要同时包含这两个语言的文档。
2. 根目录 `README.md` 文档。如果涉及根目录的 `README.md` 文档需要更新，需要同步到 `packages/vitepress-mermaid/README.md` 文档。
