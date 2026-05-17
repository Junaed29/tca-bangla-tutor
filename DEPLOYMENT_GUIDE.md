# 🚀 GitHub Pages Deployment Guide

> Temporary file — delete it after your first successful deploy.

Everything inside the project is already wired up for you. You only need to do **3 things on GitHub's side**: create the repo, push the code, enable Pages.

---

## What I set up for you (already done)

- `.github/workflows/deploy.yml` — GitHub Actions workflow that runs on every push to the `release` branch.
- `src/lib/url.ts` — `withBase()` helper that makes all internal links work whether the site lives at `/` (user site, custom domain) or `/<repo>/` (project site).
- `astro.config.mjs` — reads `SITE_URL` and `BASE_PATH` from environment variables (set by the workflow).
- All hand-coded internal links (`<a href>`, font preloads, favicon) updated to use `withBase()`.
- Local `main` and `release` branches created and the workflow already committed on both.

The workflow builds the Astro site on an Ubuntu runner, installs Playwright Chromium (needed by `rehype-mermaid`), runs `npm run build`, then publishes the `dist/` folder via `actions/deploy-pages@v4`.

---

## What you need to do — three steps

### Step 1 · Create the GitHub repo and push

1. Go to **github.com → New repository**.
2. Name it whatever you like. Two suggestions:
   - **`tca-bangla-tutor`** (or anything) → site will live at `https://<your-username>.github.io/tca-bangla-tutor/`.
   - **`<your-username>.github.io`** → site will live at `https://<your-username>.github.io/` (no sub-path). Cleaner URL, but you can only have one user site per account.
3. **Don't** add a README, `.gitignore`, or license from the GitHub UI — your local repo already has these.
4. Copy the URL GitHub shows (e.g. `git@github.com:<you>/tca-bangla-tutor.git`).
5. In your terminal, from the project root:

   ```bash
   git remote add origin git@github.com:<you>/<repo>.git

   # Push main
   git push -u origin main

   # Push release (this also triggers the first deploy!)
   git push -u origin release
   ```

### Step 2 · Turn on GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**.
3. Done. No configuration needed here — the workflow handles everything.

> 💡 If you don't see "GitHub Actions" as a Source option, your repo might be private and on the free Pro/Free plan. GitHub Pages is free on public repos and Pro/Team accounts; for private free-tier repos you'll need to make the repo public, or upgrade.

### Step 3 · Watch it deploy

1. Go to the **Actions** tab on your repo.
2. You should see a workflow run named **"Deploy to GitHub Pages"** in progress (or already completed if you pushed a minute ago).
3. Click into it — both jobs (`build` → `deploy`) should turn green in about 90–120 seconds.
4. Once `deploy` finishes, click the **"Deploy"** job → it shows the URL near the top, something like:
   - `https://<your-username>.github.io/<repo>/` (project repo), or
   - `https://<your-username>.github.io/` (user-site repo).
5. Click it. ✓ Site live.

---

## How to deploy a new version after this

Pushing to `main` does **nothing** — that's intentional. `main` is your working branch.

To deploy:

```bash
# Make sure main has whatever you want to ship
git checkout main
# ... commits ...
git push origin main

# Promote main to release
git checkout release
git merge main --ff-only
git push origin release
```

The push to `release` triggers the workflow. ~2 minutes later your site is updated.

A faster shortcut (one-liner) when main = release should be force-aligned:

```bash
git push origin main:release
```

That pushes whatever `main` currently is to the `release` branch on the remote without checking out.

You can also re-run the latest workflow manually from the **Actions** tab → workflow → **Run workflow** button (the `workflow_dispatch:` trigger in the YAML).

---

## Custom domain (optional)

If you want to host this at, say, `tca.example.com` instead of `<you>.github.io/<repo>/`:

1. In repo Settings → Pages → **Custom domain** → enter your domain → Save.
2. GitHub will create a file called `CNAME` in your `gh-pages` deploy.
3. Add a DNS record at your registrar:
   - **Apex domain** (`example.com`): 4 A records → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`.
   - **Subdomain** (`tca.example.com`): one CNAME → `<you>.github.io.`
4. Wait for DNS to propagate (5 min – 1 hour). Settings → Pages will show ✓ when ready.
5. Tick **Enforce HTTPS** once it's available.

With a custom domain, your site URL becomes the apex/subdomain you chose, but the build still uses the project base path. If you want a clean `/` base under a custom domain on a project repo, edit `.github/workflows/deploy.yml` and change the "Resolve site + base path" step to always emit `base=/`.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Workflow fails at "Install dependencies" | Lockfile out of sync | Run `npm install` locally, commit `package-lock.json`, push again |
| Workflow fails at "Install Playwright" | Network blip on the runner | Re-run the workflow from Actions tab |
| Site loads but CSS is missing / 404s on assets | `BASE_PATH` wrong for your repo name | Check repo name vs. URL. The workflow auto-detects, but if you renamed the repo after deploying, push again |
| Bengali fonts show as squares | Fonts blocked by browser cache from previous deploy | Hard refresh (⌘+Shift+R / Ctrl+F5) |
| 404 page everywhere | Pages source not set to "GitHub Actions" | Settings → Pages → Source → GitHub Actions |
| Deploy stuck on "queued" | Free-tier concurrency limit | Wait 1–2 min, or cancel and re-run |

You can always inspect what the workflow built by downloading the artifact from the Actions run (top of the run page → "github-pages" artifact).

---

## When you're done

After your first successful deploy, you can delete this file:

```bash
rm DEPLOYMENT_GUIDE.md
git commit -am "Remove deployment guide"
git push origin main
```

The README has a short deploy reference at the bottom, so the knowledge isn't lost.

— চা ঠান্ডা হওয়ার আগে deploy হয়ে যাক। 🍵
