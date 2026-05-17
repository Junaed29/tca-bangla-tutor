// Prefixes an absolute path with Astro's base path so links work both in local
// dev (base = '/') and in a GitHub-Pages-style deployment (base = '/repo-name').
//
// Usage: <a href={withBase('/chapters/foo')}>...</a>
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  // Special case: "/" stays as the base itself (so the home link works).
  if (p === '/') return base + '/';
  return base + p;
}
