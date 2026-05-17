# 🍵 TCA বাংলায় — The Composable Architecture tutorial in Bengali

MVVM/SwiftUI থেকে আসা Bengali developer-দের জন্য একটা গল্প-based, modern TCA tutorial site। ১২টা অধ্যায়, একটা চা স্টলের metaphor, পুরোটাই TCA-র সাম্প্রতিক (1.5+) macro-based API-তে।

---

## 🚀 কীভাবে browser-এ চালাবে (Quick start)

প্রয়োজন: **Node 22+** (ভালো হয় Node 24 বা তার পরের version)। যাচাই করো `node --version` দিয়ে।

```bash
# ১. প্রথম বার dependencies install করো (এক বার internet লাগবে):
npm install

# ২. Local dev server চালাও:
npm run dev

# Browser খুলে যাও:
# http://localhost:4321
```

দেখা শেষে browser-এ যাও — `http://localhost:4321` — হোমপেজ থেকে অধ্যায় ০০ শুরু।

> 💡 প্রথম `npm install` দিতে ২-৩ মিনিট সময় লাগতে পারে (~৫০০ MB)। এর পরে সব offline।

---

## 🏗️ Production build

```bash
# Static files build (output → dist/):
npm run build

# Local-এ preview করো:
npm run preview
```

`dist/` folder টাই সাইটের static output — যেকোনো static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3) এ deploy করা যায়।

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
    ├── fonts/                  # Hind Siliguri + JetBrains Mono (self-hosted woff2)
    └── favicon.svg
```

## 🧰 Tech stack

| Tool | কেন |
|---|---|
| **Astro 5** | Static-first, content-rich site-এর জন্য আদর্শ। View transitions built-in। |
| **MDX** | Markdown-এ Astro components embed। Chapter file গুলো MDX। |
| **Tailwind CSS 4** | Utility-first styling। `@import "tailwindcss"` + `@theme` tokens। |
| **Shiki** | Build-time syntax highlight, dual theme (light + dark)। |
| **rehype-mermaid** | Mermaid diagrams build time-এ SVG-তে render — কোনো JS lib runtime-এ লোড হয় না। |
| **Pagefind** | Static client-side full-text search, Bengali Unicode handle করে দারুণ। |
| **Hind Siliguri** | Bengali web font, self-hosted woff2 (public/fonts/)। |

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
partLabel: "PART ৩ — গভীরে"
order: 13
readingTime: "৮ মিনিট পড়ার সময়"
summary: "এক লাইনের summary"
---
```

`order` field দিয়ে chapter sequence ঠিক হয়।

## 🌐 Deploy

`npm run build` করার পর `dist/` folder কে যেকোনো static host এ push করো:

- **Netlify / Vercel / Cloudflare Pages** — repo connect করলেই auto-build।
- **GitHub Pages** — `dist/` কে `gh-pages` branch এ push।
- **নিজের server** — `dist/` কে `/var/www/...` এ rsync।

## ❤️ Credit

এই project যেমন একটা শখ — তেমনই open। কোথাও bug দেখলে, Bangla আরো natural করতে চাইলে — PR পাঠাও।

ভালোবেসে বানানো। চা ঠান্ডা হওয়ার আগে শেষ করো।
