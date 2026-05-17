// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import rehypeMermaid from 'rehype-mermaid';
import { transformerNotationHighlight, transformerNotationDiff } from '@shikijs/transformers';

// SITE / BASE come from CI env vars when deployed to GitHub Pages.
// `astro dev` keeps the clean localhost root so local browsing stays at
// http://localhost:4321/ . `astro build` (and CI) fall back to the real
// production URLs so the sitemap and <meta og:url> tags are correct even
// when the site is built outside of GitHub Actions.
const isDev = process.env.NODE_ENV !== 'production';
const SITE = process.env.SITE_URL
  || (isDev ? 'http://localhost:4321' : 'https://junaed29.github.io');
const BASE = process.env.BASE_PATH
  || (isDev ? '/' : '/tca-bangla-tutor');

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  integrations: [
    mdx(),
    sitemap(),
    pagefind(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      transformers: [
        transformerNotationHighlight(),
        transformerNotationDiff(),
      ],
      wrap: false,
    },
    rehypePlugins: [
      [rehypeMermaid, {
        strategy: 'img-svg',
        mermaidConfig: {
          theme: 'base',
          themeVariables: {
            fontFamily: '"Hind Siliguri", system-ui, sans-serif',
            primaryColor: '#FFF8EE',
            primaryTextColor: '#2D2A26',
            primaryBorderColor: '#8B5A2B',
            lineColor: '#6B6259',
            secondaryColor: '#FFF2E0',
            tertiaryColor: '#E8DDC9',
          },
        },
      }],
    ],
  },
});
