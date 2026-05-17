# 🍵 TCA বাংলায়, The Composable Architecture tutorial in Bengali

MVVM/SwiftUI থেকে আসা Bengali developer-দের জন্য একটা game-flavored, গল্প-based, modern TCA tutorial site। ১৪টা quest, একটা চা স্টলের metaphor, পুরোটাই TCA-র সাম্প্রতিক (1.5+) macro-based API-তে। শেষে bug-শিকারের রাত আর একটা সত্যিকারের project (with tests)।

---

## 🚀 কীভাবে browser-এ চালাবে (Quick start)

প্রয়োজন: **Node 22+** Homebrew থেকে ইনস্টল করা, `brew install node`। যাচাই করো `npm run check-node` দিয়ে।

```bash
# ১. প্রথম বার dependencies install করো (এক বার internet লাগবে):
npm install

# ২. Local dev server চালাও:
npm run dev

# Browser খুলে যাও:
# http://localhost:4321
```

দেখা শেষে browser-এ যাও, `http://localhost:4321`, হোমপেজ থেকে অধ্যায় ০০ শুরু।

> 💡 প্রথম `npm install` দিতে ২-৩ মিনিট সময় লাগতে পারে (~৫০০ MB)। এর পরে সব offline।

### 🍎 macOS Sequoia (15+) note

macOS Sequoia-তে কিছু IDE-bundled Node (যেমন VS Code/Codex-এর built-in node) প্রিবিল্ট native binary load করতে পারে না, *Team ID mismatch* error দেয়। এই কারণে `npm run dev`/`build`/`preview` scripts-গুলো নিজে থেকেই Homebrew-installed Node-কে PATH-এর আগে রেখে চালায়।

তোমার যদি Homebrew Node না থাকে, install করে নাও:

```bash
brew install node
```

তারপর `npm run dev` কাজ করবে যেকোনো terminal থেকে, IDE-bundled Node থাকলেও সমস্যা নেই।

---

## 🏗️ Production build

```bash
# Static files build (output → dist/):
npm run build

# Local-এ preview করো:
npm run preview
```

`dist/` folder টাই সাইটের static output, যেকোনো static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3) এ deploy করা যায়।

---

## 📁 Project structure

```text
/
├── astro.config.mjs            # Astro + MDX + Tailwind + Pagefind + Mermaid config
├── src/
│   ├── content/
│   │   └── chapters/           # ১২টা MDX chapter ফাইল (Bengali)
│   ├── components/             # Layout, Callout, CodeBlock, TeaStallScene ইত্যাদি
│   ├── layouts/Layout.astro    # Base shell
│   ├── pages/
│   │   ├── index.astro         # হোম
│   │   ├── chapters/[...slug].astro
│   │   ├── glossary.astro
│   │   └── about.astro
│   ├── styles/global.css       # Tailwind v4 imports + tokens
│   ├── consts.ts
│   └── content.config.ts       # Chapters collection schema
└── public/
    ├── fonts/                  # Noto Sans Bengali + JetBrains Mono (self-hosted woff2)
    └── favicon.svg
```

## 🧰 Tech stack

| Tool | কেন |
|---|---|
| **Astro 5** | Static-first, content-rich site-এর জন্য আদর্শ। View transitions built-in। |
| **MDX** | Markdown-এ Astro components embed। Chapter file গুলো MDX। |
| **Tailwind CSS 4** | Utility-first styling। `@import "tailwindcss"` + `@theme` tokens। |
| **Shiki** | Build-time syntax highlight, dual theme (light + dark)। |
| **rehype-mermaid** | Mermaid diagrams build time-এ SVG-তে render, কোনো JS lib runtime-এ লোড হয় না। |
| **Pagefind** | Static client-side full-text search, Bengali Unicode handle করে দারুণ। |
| **Noto Sans Bengali** | Bengali web font, variable, self-hosted woff2 (public/fonts/)। |

## 🛠️ Useful commands

| কমান্ড | কাজ |
|---|---|
| `npm install` | Dependencies install করো (একবার)। |
| `npm run dev` | `http://localhost:4321`-এ dev server। View transition + hot reload। |
| `npm run build` | Static site build → `dist/`। |
| `npm run preview` | `dist/` কে local-এ preview করো। |
| `npm run astro check` | Type-check + content schema validate। |

## ✏️ নতুন অধ্যায় যোগ করতে চাইলে

`src/content/chapters/` এর ভেতরে নতুন `XX-slug.mdx` ফাইল বানাও। Frontmatter এ এই সব dরকার:

```yaml
---
number: "১৩"
title: "Chapter title"
subtitle: "ঐচ্ছিক subtitle"
part: "গভীরে"            # 'warm-up' | 'গল্প' | 'হাতে কলমে' | 'গভীরে' | 'সিদ্ধান্ত' | 'closing'
partLabel: "PART ৩, গভীরে"
order: 13
readingTime: "৮ মিনিট পড়ার সময়"
summary: "এক লাইনের summary"
---
```

`order` field দিয়ে chapter sequence ঠিক হয়।

## 🌐 Deploy

এই repo-তে **GitHub Pages**-এর জন্য একটা CI/CD workflow ইতিমধ্যেই configure করা, `release` branch-এ push করলে site auto-deploy হবে।

```bash
# main-এ যা commit করেছ, সেটাই release-এ push করো:
git push origin main:release
```

Workflow file: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)। প্রথমবার setup-এর full instruction `DEPLOYMENT_GUIDE.md`-এ ছিল (delete হয়ে গিয়ে থাকতে পারে, git log-এ দেখো)।

অন্য host ব্যবহার করতে চাইলে, `npm run build` করো, তারপর `dist/` folder-টা যেকোনো static host-এ push করো:

- **Netlify / Vercel / Cloudflare Pages**, repo connect করলেই auto-build।
- **নিজের server**, `dist/` কে `/var/www/...` এ rsync।

## ❤️ Credit

এই project যেমন একটা শখ, তেমনই open। কোথাও bug দেখলে, Bangla আরো natural করতে চাইলে, PR পাঠাও।

ভালোবেসে বানানো। চা ঠান্ডা হওয়ার আগে শেষ করো।
