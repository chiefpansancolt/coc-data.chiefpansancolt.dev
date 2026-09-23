# Documentation Template Guide

This guide walks you through customizing the template for your own documentation site.

---

## What's Included Out of the Box

| Feature                                               | Status      |
| ----------------------------------------------------- | ----------- |
| Next.js App Router + Markdoc docs pages               | ✅ Ready    |
| Search (FlexSearch, client-side, no external service) | ✅ Ready    |
| Dark mode                                             | ✅ Ready    |
| Mobile navigation, table of contents, prev/next links | ✅ Ready    |
| SEO baseline (see below)                              | ✅ Ready    |
| CI (lint + build), manual-dispatch deploy workflow    | ✅ Ready    |
| Home page + 5 example doc pages                       | ✅ Scaffold |

---

## Section 1 — Rename the Template

Search for all `CHANGE_ME` and `YOUR_` tokens across the codebase:

```bash
grep -rn "CHANGE_ME\|YOUR_APP_NAME\|YOUR_GITHUB_USERNAME\|YOUR_REPO\|YOUR_LANGUAGE\|YOUR_KEYWORD\|YOUR_CONTEXT" src/ public/ *.md *.json
```

Files to update:

| File                                                                  | What to change                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `package.json`                                                        | `name`, `description`, `repository.url`, `homepage`                      |
| `src/app/layout.tsx`                                                  | `siteUrl`, `siteDescription`, title/keywords, JSON-LD block              |
| `src/app/robots.ts`                                                   | `SITE_URL` — must match `siteUrl` in `layout.tsx`                        |
| `src/app/sitemap.ts`                                                  | `SITE_URL` — must match `siteUrl` in `layout.tsx`                        |
| `src/app/opengraph-image.tsx`                                         | `alt` and the two text strings                                           |
| `src/lib/navigation.ts`                                               | Resources section links (roadmap, license)                               |
| `src/app/page.md`                                                     | Full rewrite — home page content                                         |
| `src/app/docs/*/page.md`                                              | Full rewrite — each doc page's content and frontmatter title/description |
| `src/components/Hero.tsx`                                             | Title, tagline, GitHub link                                              |
| `src/components/Logo.tsx`                                             | Wordmark text, or replace with your own logo SVG                         |
| `public/site.webmanifest`                                             | `name`, `short_name`                                                     |
| `public/favicon*.png`, `apple-touch-icon.png`, `android-chrome-*.png` | Replace with your own icons — these are currently generic placeholders   |
| `CNAME`                                                               | Your production domain                                                   |
| `.github/CODEOWNERS`                                                  | Your GitHub username                                                     |

---

## Section 2 — SEO Setup

The template ships with a working SEO baseline, generated from the pattern
found (and fixed) across this template's sibling documentation sites:

| File                          | What it does                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/app/layout.tsx`          | Root metadata — `siteUrl`, title template, description, keywords, OpenGraph/Twitter, canonical `/`, JSON-LD   |
| `src/app/robots.ts`           | Crawl rules + sitemap pointer. `SITE_URL` here must match `siteUrl` in `layout.tsx`                           |
| `src/app/sitemap.ts`          | Generated from `src/lib/navigation.ts` — every internal doc link in nav becomes a sitemap entry automatically |
| `src/app/opengraph-image.tsx` | Dynamically generated 1200×630 social share image — no logo file required                                     |

**The `siteUrl` / `SITE_URL` values in all three files must always match.**
A mismatch between them was a real, repeated bug found across the
documentation site family this template is built from — keep them in sync
whenever you change your domain.

**Per-page metadata pattern**: each doc page's Markdoc frontmatter sets its
own title and description, which `@markdoc/next.js` maps into Next's
`generateMetadata`:

```markdoc
---
title: Installation
nextjs:
  metadata:
    title: YOUR_APP_NAME - Installation
    description: Steps for installing and setting up YOUR_APP_NAME.
---
```

**Adding a new doc page keeps the sitemap in sync automatically** — see
Section 3 below. There's no separate sitemap list to maintain by hand (the
sibling sites this template is based on originally shipped a static,
hand-maintained `sitemap.xml` that silently went stale; this template's
`sitemap.ts` reads `navigation.ts` directly instead).

---

## Section 3 — Add a New Doc Page

1. Create `src/app/docs/your-page/page.md`:

   ```markdoc
   ---
   title: Your Page
   nextjs:
     metadata:
       title: YOUR_APP_NAME - Your Page
       description: One sentence describing this page.
   ---

   Your content here.
   ```

2. Add it to `src/lib/navigation.ts`:

   ```typescript
   { title: 'Your Page', href: '/docs/your-page' },
   ```

That's it — `sitemap.ts` picks it up automatically since it reads
`navigation.ts` at build time.

### Markdoc tags available

- `{% quick-links %}` / `{% quick-link %}` — card grid, used on the home page
- `{% figure src="..." alt="..." caption="..." /%}` — image with caption (add images to `public/images/`)
- `{% callout %}` — styled callout box (see `src/markdoc/tags.js` for the full set)

---

## Section 4 — Deploy to Vercel

The `deploy.yml` workflow is ready (manual `workflow_dispatch`, matching the
other repos in this family). Set these GitHub Actions secrets in your
repository settings:

| Secret              | Where to find it                                   |
| ------------------- | -------------------------------------------------- |
| `VERCEL_TOKEN`      | Vercel → Account Settings → Tokens                 |
| `VERCEL_ORG_ID`     | `.vercel/project.json` after running `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after running `vercel link` |

Then trigger the workflow manually from GitHub Actions → Deploy → Run workflow.

If these secrets aren't set, the deploy workflow fails immediately with a
"missing --token value" error from the Vercel CLI — that's expected until
the repo is linked to a real Vercel project.
