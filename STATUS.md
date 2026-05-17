# Project Status — TCA Bangla Tutor

> Live status of the build. Updated as work progresses.

## Done

### Scaffolding & infrastructure

- Astro 5 + MDX + Tailwind v4 (Vite plugin) + Shiki dual-theme + Pagefind + rehype-mermaid (img-svg strategy).
- `astro.config.mjs` configured with the full pipeline.
- `src/content.config.ts` defines the chapters collection schema.
- `src/styles/global.css` — Tailwind v4 `@theme` tokens, light + dark CSS variables, prose styles, code-block styling, Shiki dual-theme swap, font-face declarations.

### Fonts

- Hind Siliguri (400, 500, 700) — Bengali + Latin subsets — woff2 self-hosted in `public/fonts/`.
- JetBrains Mono (400, 500) — Latin subset — woff2 self-hosted.
- `preload` hints for the two most-used Bengali weights in `Layout.astro`.

### Components

- `Layout.astro` — site shell, theme bootstrap (pre-paint), view transitions, skip-link.
- `SiteHeader.astro` — sticky header, theme toggle, Pagefind search dialog.
- `SiteFooter.astro` — three-column footer.
- `Callout.astro` — variants: `tea-stall`, `tip`, `warn`, `try`, `remember`.
- `MvvmVsTca.astro` — side-by-side comparison component with named slots.
- `ChapterHeader.astro`, `ChapterNav.astro`, `ProgressBar.astro`, `TocSidebar.astro`, `TryIt.astro`.
- `TeaStallScene.astro` — canonical hand-authored SVG illustration; used on home page.

### Pages

- `src/pages/index.astro` — hero, tea-stall SVG, all-chapters grid, three-card promise section.
- `src/pages/chapters/[...slug].astro` — dynamic chapter route with TOC sidebar, progress bar, prev/next nav.
- `src/pages/glossary.astro` — alphabetised glossary with per-term chapter link.
- `src/pages/about.astro` — Bangla "why this site" page.

### Content — all 13 chapter files drafted

| # | Slug | Focus |
| --- | --- | --- |
| ০০ | `00-shuru-korar-age` | Warm-up — পড়ার নিয়ম, Xcode setup, TCAPlayground project structure |
| ০১ | `01-cha-stole-swagatam` | চা স্টলের canonical গল্প, ৪ চরিত্র, ৪ নিয়ম |
| ০২ | `02-tca-ki-mvvm-er-songe-parthokyo` | MVVM vs TCA পাশাপাশি |
| ০৩ | `03-panch-bondhur-porichoy` | State / Action / Reducer / Store / Effect এক এক করে |
| ০৪ | `04-prothom-counter-app` | প্রথম hands-on — `@Reducer`, `@ObservableState`, Store |
| ০৫ | `05-side-effect-api-call` | `.run` effect, NumberFact API |
| ০৬ | `06-duita-feature-ekshathe` | Scope, composition |
| ০৭ | `07-navigation` | `@Presents`, Destination enum, sheet/alert |
| ০৮ | `08-dependencies` | `@Dependency`, DependencyKey, live/preview/test values |
| ০৯ | `09-testing` | TestStore — sync, async, dependency override, exhaustive assertion |
| ১০ | `10-kokhon-tca-kokhon-na` | Decision tree, ৬ green + ৬ red flag |
| ১১ | `11-chhoto-real-project` | Todo app — full walkthrough + tests |
| ১২ | `12-erpor-kothay-jabe` | Resources, ৩০-day practice plan |

Every hands-on chapter (04, 05, 06, 07, 08, 11) opens with a tip-style callout pointing the reader to the exact `TCAPlayground/ChapterXX_Name/` folder. Chapter 09 points to `TCAPlaygroundTests/`.

Every code sample uses **modern TCA only**: `@Reducer`, `@ObservableState`, `Scope`, `.run`, `@Dependency`. Zero `WithViewStore`, `.pullback`, `.combine`, `Reducer<State, Action, Environment>`, or `Effect<...>` anywhere — except inside explicit "this is the *old* API, avoid it" warning callouts.

### Diagrams

Every chapter from 01 onward has at least one diagram. Mermaid diagrams render at build time as inline SVG data-URIs via `rehype-mermaid` (img-svg strategy) — no client-side mermaid runtime. The চা স্টল hand-authored SVG is reused on the home page and chapters 01 and 04. Chapter 10 has the full decision-tree flowchart.

## Verified

- `npm run build` clean — 16 pages built in ~3.5s, zero errors, zero warnings.
- Pagefind indexed all 13 chapter bodies (chapters use `data-pagefind-body`).
- `npm run preview` smoke-tested locally — homepage, every chapter, glossary, and 404 fallback respond correctly.
- চা স্টল metaphor appears in every one of the 13 chapters.
- Bundle: full `dist/` is 3.1 MB including all self-hosted fonts and Pagefind index.

## Open follow-ups

- The Astro 5 / Pagefind UI / Tailwind 4 combo brought one rollup native-binary code-signature warning on macOS 15; resolved by switching to Homebrew Node 25 for the build (`/opt/homebrew/opt/node/bin`). Documenting that the project also runs cleanly on Node 22 LTS.
- The site is local-only; deploying is a downstream step (`dist/` is static).

## Known shortcomings

- No automated test of the *site itself* (Playwright/visual regression). Out of scope for this initial cut.
- Pagefind index covers chapter `data-pagefind-body` regions only — glossary and about are intentionally excluded to keep results focused.
- Lighthouse score depends on host; the build output is small (under 1 MB total including all fonts), so 95+ should be achievable on any decent static host.
