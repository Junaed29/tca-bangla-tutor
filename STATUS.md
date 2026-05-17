# Project Status, TCA Bangla Tutor

> Live status of the build. Updated as work progresses.

## Done

### Scaffolding & infrastructure

- Astro 5 + MDX + Tailwind v4 (Vite plugin) + Shiki dual-theme + Pagefind + rehype-mermaid (img-svg strategy).
- `astro.config.mjs` configured with the full pipeline.
- `src/content.config.ts` defines the chapters collection schema.
- `src/styles/global.css`, Tailwind v4 `@theme` tokens, light + dark CSS variables, prose styles, code-block styling, Shiki dual-theme swap, font-face declarations, **5 new game-style callout color tokens** (checkpoint, power-up, boss-battle, cheat-code, mystery, plus reused for level-up).

### Fonts

- Hind Siliguri (400, 500, 700), Bengali + Latin subsets, woff2 self-hosted in `public/fonts/`.
- JetBrains Mono (400, 500), Latin subset, woff2 self-hosted.
- `preload` hints for the two most-used Bengali weights in `Layout.astro`.

### Components

- `Layout.astro`, site shell, theme bootstrap (pre-paint), view transitions, skip-link.
- `SiteHeader.astro`, sticky header, theme toggle, Pagefind search dialog.
- `SiteFooter.astro`, three-column footer.
- `Callout.astro`, **11 variants** now: `tea-stall`, `tip`, `warn`, `try`, `remember`, `checkpoint`, `power-up`, `boss-battle`, `cheat-code`, `mystery`, `level-up`. Each with its own background, border color, icon, and Bangla default title.
- `MvvmVsTca.astro`, side-by-side comparison.
- `ChapterHeader.astro`, `ChapterNav.astro`, `ProgressBar.astro` (dynamic total, handles any chapter count), `TocSidebar.astro` (sorts dynamically by `order`), `TryIt.astro`.
- `TeaStallScene.astro`, canonical hand-authored SVG.

### Pages

- `src/pages/index.astro`, hero with quest framing, tea-stall SVG, all-chapters grid, three-card promise section.
- `src/pages/chapters/[...slug].astro`, dynamic chapter route with TOC sidebar, progress bar (now /14), prev/next nav.
- `src/pages/glossary.astro`, alphabetised glossary with per-term chapter link (updated for new slug map).
- `src/pages/about.astro`, Bangla "why this site" page.

### Content, 14 chapters now (was 13)

| # | Slug | Focus |
| --- | --- | --- |
| ০০ | `00-shuru-korar-age` | Warm-up, পড়ার নিয়ম, Xcode setup, TCAPlayground project structure |
| ০১ | `01-cha-stole-swagatam` | চা স্টলের canonical গল্প, ৪ চরিত্র, ৪ নিয়ম |
| ০২ | `02-tca-ki-mvvm-er-songe-parthokyo` | MVVM vs TCA পাশাপাশি |
| ০৩ | `03-panch-bondhur-porichoy` | State / Action / Reducer / Store / Effect এক এক করে |
| ০৪ | `04-prothom-counter-app` | **Quest ০৪**, প্রথম জাদু: Counter app |
| ০৫ | `05-side-effect-api-call` | **Quest ০৫**, ছোট ভাইকে কাজে লাগাও (Side Effect) |
| ০৬ | `06-duita-feature-ekshathe` | **Quest ০৬**, দুইটা Feature একসাথে |
| ০৭ | `07-navigation` | **Quest ০৭**, Navigation: এক screen থেকে আরেক |
| ০৮ | `08-dependencies` | **Quest ০৮**, Dependencies: বাইরের জগৎ |
| ০৯ | `09-testing` | **Quest ০৯**, Detective হও: TestStore-এর জাদু (expanded to ~2700 words, 8 sections, 6 code samples, TestClock, exhaustivity, NumberFact full test suite) |
| ১০ | `10-bug-shikar` | **Quest ১০**, Bug শিকার (NEW, ~2700 words, 5 cases, 5 tools, UI testing, snapshot testing, workflow) |
| ১১ | `11-kokhon-tca-kokhon-na` | **Quest ১১**, কখন TCA, কখন না |
| ১২ | `12-chhoto-real-project` | **Quest ১২**, একটা সত্যিকারের Project (with tests), Todo app, ৮ unit tests + ১ UI test + debugging story |
| ১৩ | `13-erpor-kothay-jabe` | এরপর কোথায় যাবে |

Chapters 04 to 12 all open with Quest-framed titles. Each ends with a Checkpoint + Level Up callout. Game-style callouts (`power-up`, `boss-battle`, `cheat-code`, `mystery`) used naturally throughout, not forced.

Every hands-on chapter (04, 05, 06, 07, 08, 12) opens with a tip-style callout pointing the reader to the exact `TCAPlayground/ChapterXX_Name/` folder. Chapter 09 points to `TCAPlaygroundTests/`. Chapter 12 also references `TCAPlaygroundUITests/`.

Every code sample uses **modern TCA only**: `@Reducer`, `@ObservableState`, `Scope`, `.run`, `@Dependency`. Zero `WithViewStore`, `.pullback`, `.combine`, `Reducer<State, Action, Environment>`, or `Effect<...>` anywhere, except inside explicit "this is the *old* API, avoid it" warning callouts.

### Diagrams

Every chapter from 01 onward has at least one diagram. Mermaid diagrams render at build time as inline SVG data-URIs. The চা স্টল SVG is reused on home, 01, 04. Chapter 11 (decision tree), chapter 09 (TestStore flow), chapter 10 (bug-hunting workflow), chapter 12 (architecture + project tree).

### Tests covered in content

- Chapter 09 covers TestStore basics, async effect testing, TestClock, exhaustivity, and NumberFact full test suite (4 tests).
- Chapter 10 covers `_printChanges`, LLDB breakpoints, View Hierarchy, network inspector, TestStore failure messages, UI testing with XCUIApplication, snapshot testing.
- Chapter 12 includes 6 `TodosFeatureTests`, 2 `EditTodoFeatureTests`, 1 `Chapter12_TodoUITests` end-to-end UI test, and a real debugging story echoing Chapter 10's Case 2.

## Verified

- `npm run build` clean, all 17 pages (14 chapters + home + glossary + about) built, zero errors, zero warnings.
- Pagefind indexed every chapter body.
- `npm run preview` smoke-tested, homepage, every chapter, glossary, 404 fallback all OK.
- চা স্টল metaphor appears in every one of the 14 chapters.

## Open follow-ups

- Astro 6 + rolldown-vite is the upstream direction; we pinned Astro 5 for Tailwind 4 compat. Revisit when Tailwind 4 ships rolldown-compatible Vite plugin.
- macOS 15 needs the Homebrew Node binary for the rollup native binary to load. Document the `/opt/homebrew/opt/node/bin` PATH override in CI setup if applicable.

## Known shortcomings

- No automated test of the *site itself* (Playwright/visual regression). The MDX schema is type-checked; build correctness is verified by the static build itself.
- Pagefind index covers chapter `data-pagefind-body` regions only, glossary and about are intentionally excluded to keep results focused.
